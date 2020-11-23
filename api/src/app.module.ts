import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoodMorningModule } from './modules/good-morning/module';

@Module({
  imports: [GoodMorningModule, ConfigModule.forRoot()],
})
export class AppModule {}
