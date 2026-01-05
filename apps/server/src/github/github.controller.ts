import { Controller, Get, HttpCode } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
    constructor(private readonly githubService: GithubService) { }

    @Get("/me")
    @HttpCode(200)
    async fetchUserInfo() {
        return this.githubService.fetchUserInfo()
    }
}
