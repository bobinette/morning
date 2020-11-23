import { Module } from '@nestjs/common';
import { GoodMorningController } from './controller';
import { GoodMorningService } from './service';

@Module({
  controllers: [GoodMorningController],
  providers: [GoodMorningService],
})
export class GoodMorningModule {}
