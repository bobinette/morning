import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string | number>('PORT');
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
