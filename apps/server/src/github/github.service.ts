import {
  Injectable,
  InternalServerErrorException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { GithubRepo, GithubUserInfo } from '@portifolio/types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class GithubService {
  private axiosInstance: AxiosInstance;

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    const token = this.configService.get<string>('GITHUB_ACCESS_TOKEN');
    const userAgent = this.configService.get<string>('GITHUB_USER_AGENT');

    this.axiosInstance = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': userAgent,
        Accept: 'application/vnd.github.v3+json',
      },
    });
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
      const { data: user } = await this.axiosInstance.get('/user');
      const { data: repos } = await this.axiosInstance.get('/user/repos', {
        params: {
          visibility: 'public',
          affiliation: 'owner',
          sort: 'pushed',
          direction: 'desc',
        },
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
    } catch (err: any) {
      throw new InternalServerErrorException(
        err.response?.data?.message || err.message,
      );
    }
  }

  async fetchRepoThumbnail(
    repoName: string,
    refresh: boolean = false,
  ): Promise<{ buffer: Buffer; ext: string }> {
    const cacheKey = `github:thumbnail:${repoName}`;
    const cachedData = await this.cacheManager.get<any>(cacheKey);

    if (cachedData && !refresh) {
      const bufferValue = cachedData.buffer;
      const buffer = Buffer.isBuffer(bufferValue)
        ? bufferValue
        : Buffer.from(bufferValue.data || bufferValue);

      return {
        buffer,
        ext: cachedData.ext,
      };
    }

    const extensions = ['png', 'jpg', 'jpeg'];

    try {
      const { data: user } = await this.axiosInstance.get('/user');

      for (const ext of extensions) {
        try {
          const { data } = await this.axiosInstance.get(
            `/repos/${user.login}/${repoName}/contents/thumbnail/${repoName}.${ext}`,
          );

          if (data && typeof data.content === 'string') {
            const result = {
              buffer: Buffer.from(data.content, 'base64'),
              ext,
            };

            await this.cacheManager.set(cacheKey, result, 1000 * 60 * 60 * 2);

            return result;
          }
        } catch (err: any) {
          if (err.response?.status !== 404) {
            throw new InternalServerErrorException(
              err.response?.data?.message || err.message,
            );
          }
        }
      }
    } catch (err: any) {
      throw new InternalServerErrorException(
        err.response?.data?.message || err.message,
      );
    }

    throw new InternalServerErrorException('Thumbnail not found');
  }
}
