import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { GithubRepo, GithubUserInfo } from "@portifolio/types"


@Injectable()
export class GithubService {

    private client: Octokit;

    constructor(private configService: ConfigService) {
        this.client = new Octokit({
            auth: this.configService.get<string>('GITHUB_ACCESS_TOKEN'),
            userAgent: this.configService.get<string>('GITHUB_USER_AGENT'),
        });
    }

    async fetchUserInfo(): Promise<GithubUserInfo> {
        try {
            const { data: user } = await this.client.rest.users.getAuthenticated();
            const { data: repos } = await this.client.request('GET /user/repos', {
                visibility: 'public',
                affiliation: 'owner',
                sort: 'pushed',
                direction: 'desc',
            });

            return {
                user: {
                    name: user.login,
                    avatarUrl: user.avatar_url
                },
                repos: repos as GithubRepo[]
            };
        }
        catch (err) {
            throw new InternalServerErrorException(err.message)
        }
    }

    private async fetchReadme(repo: GithubRepo) {
        try {
            return await this.client.rest.repos.getReadme({ repo: repo.full_name, owner: repo.owner.url })
        } catch (err) {
            throw new InternalServerErrorException(err.message)
        }
    }
}
