import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let cachedApp: INestApplication;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  const app = await NestFactory.create(AppModule, { rawBody: true });

  const origins = [process.env.CLIENT_ORIGIN, 'http://localhost:4200'].filter(
    Boolean,
  ) as string[];

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.init();
  cachedApp = app;
  return app;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));
}

export default async (req: any, res: any) => {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
};
