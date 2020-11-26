import { Module } from '@nestjs/common';
import { EventStore } from 'modules/json-db/event-store';
import { JSONHighlightRepository } from 'modules/json-db/highlights';
import { JSONModule } from 'modules/json-db/module';
import { HighlightController } from './controller';
import { HighlightService } from './service';

@Module({
  imports: [JSONModule],
  controllers: [HighlightController],
  providers: [JSONHighlightRepository, EventStore, HighlightService],
})
export class HighlightModule {}
