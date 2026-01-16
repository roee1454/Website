import {
  Controller,
  Get,
  HttpCode,
  Param,
  Res,
  StreamableFile,
  Query,
  Post,
  Req,
  Header,
} from '@nestjs/common';
import { GithubService } from './github.service';
import type { Response, Request } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post('/webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: Request) {
    const signature = req.headers['x-hub-signature-256'] as string;
    // @ts-ignore - rawBody is added by NestJS when configured
    const rawBody = req.rawBody;
    await this.githubService.handleWebhook(rawBody, signature, req.body);
    return { received: true };
  }

  @Get('/me')
  @HttpCode(200)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  async fetchUserInfo(@Query('refresh') refresh?: string) {
    return this.githubService.fetchUserInfo(refresh === 'true');
  }

  @Get('/:repoName/thumbnail')
  @HttpCode(200)
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  async fetchRepoThumbnail(
    @Param('repoName') repoName: string,
    @Res({ passthrough: true }) res: Response,
    @Query('refresh') refresh?: string,
  ) {
    const { buffer, ext } = await this.githubService.fetchRepoThumbnail(
      repoName,
      refresh === 'true',
    );
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
    res.set('Content-Type', contentType);
    return new StreamableFile(buffer);
  }
}
