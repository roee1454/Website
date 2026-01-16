import {
  Injectable,
  InternalServerErrorException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Octokit } from 'octokit';
import { GithubRepo, GithubUserInfo } from '@portifolio/types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class GithubService {
  private client: Octokit | null = null;

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async getClient(): Promise<Octokit> {
    if (this.client) return this.client;

    const { Octokit } = await (eval('import("octokit")') as Promise<
      typeof import('octokit')
    >);
    const client = new Octokit({
      auth: this.configService.get<string>('GITHUB_ACCESS_TOKEN'),
      userAgent: this.configService.get<string>('GITHUB_USER_AGENT'),
    });
    this.client = client;
    return client;
  }

  async handleWebhook(rawBody: Buffer, signature: string, payload: any) {
    const secret = this.configService.get<string>('GITHUB_WEBHOOK_SECRET');
    if (!secret) return;

    const hmac = createHmac('sha256', secret);
    const digest = Buffer.from(
      'sha256=' + hmac.update(rawBody).digest('hex'),
      'utf8',
    );
    const checksum = Buffer.from(signature, 'utf8');

    if (
      checksum.length !== digest.length ||
      !timingSafeEqual(digest, checksum)
    ) {
      throw new ForbiddenException('Invalid signature');
    }

    // If it's a push event, clear the cache for that repo
    const repoName = payload.repository?.name;
    if (repoName) {
      await this.cacheManager.del('github:user_info');
      await this.cacheManager.del(`github:thumbnail:${repoName}`);
      console.log(`[Webhook] Invalidated cache for repo: ${repoName}`);
    }
  }

  async fetchUserInfo(refresh: boolean = false): Promise<GithubUserInfo> {
    const cacheKey = 'github:user_info';
    const cachedData = await this.cacheManager.get<GithubUserInfo>(cacheKey);

    if (cachedData && !refresh) {
      return cachedData;
    }

    try {
      const client = await this.getClient();
      const { data: user } = await client.rest.users.getAuthenticated();
      const { data: repos } = await client.request('GET /user/repos', {
        visibility: 'public',
        affiliation: 'owner',
        sort: 'pushed',
        direction: 'desc',
      });

      const result: GithubUserInfo = {
        user: {
          name: user.login,
          avatarUrl: user.avatar_url,
        },
        repos: repos as GithubRepo[],
      };

      await this.cacheManager.set(cacheKey, result, 1000 * 60 * 60 * 2);

      return result;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async fetchRepoThumbnail(
    repoName: string,
    refresh: boolean = false,
  ): Promise<{ buffer: Buffer; ext: string }> {
    const cacheKey = `github:thumbnail:${repoName}`;
    const cachedData = await this.cacheManager.get<{
      buffer: { type: 'Buffer'; data: number[] };
      ext: string;
    }>(cacheKey);

    if (cachedData && !refresh) {
      return {
        buffer: Buffer.from(cachedData.buffer.data),
        ext: cachedData.ext,
      };
    }

    const extensions = ['png', 'jpg', 'jpeg'];
    const client = await this.getClient();
    const { data: user } = await client.rest.users.getAuthenticated();

    for (const ext of extensions) {
      try {
        const { data } = await client.rest.repos.getContent({
          owner: user.login,
          repo: repoName,
          path: `thumbnail/${repoName}.${ext}`,
        });

        if ('content' in data && typeof data.content === 'string') {
          const result = {
            buffer: Buffer.from(data.content, 'base64'),
            ext,
          };

          await this.cacheManager.set(cacheKey, result, 1000 * 60 * 60 * 2);

          return result;
        }
      } catch (err: any) {
        if (err.status !== 404) {
          throw new InternalServerErrorException(err.message);
        }
      }
    }

    throw new InternalServerErrorException('Thumbnail not found');
  }
}
