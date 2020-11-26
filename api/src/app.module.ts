import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HighlightModule } from 'modules/highlights/module';
import { JSONModule } from 'modules/json-db/module';
import { GoodMorningModule } from './modules/good-morning/module';

@Module({
  imports: [
    GoodMorningModule,
    JSONModule,
    HighlightModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
