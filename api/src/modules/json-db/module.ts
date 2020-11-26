import { Module } from '@nestjs/common';
import { EventStore } from './event-store';
import { JSONHighlightRepository } from './highlights';

@Module({
  providers: [JSONHighlightRepository, EventStore],
  exports: [JSONHighlightRepository, EventStore],
})
export class JSONModule {}
