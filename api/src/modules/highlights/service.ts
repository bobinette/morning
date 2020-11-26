import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  EventStore,
  SaveHighlightCommand,
  HighlightSavedEvent,
} from 'modules/json-db/event-store';
import { JSONHighlightRepository } from 'modules/json-db/highlights';

import { HighlightEntity } from './entity';
import { HighlightDto } from './dto/HighlightDto';

@Injectable()
export class HighlightService {
  // Use @Inject('HL_REPOSITORY') and the likes to do that
  constructor(
    private highlightRepository: JSONHighlightRepository,
    private eventStore: EventStore,
  ) {}

  save = async (hl: HighlightDto): Promise<HighlightDto> => {
    const uuid = uuidv4();
    const saveHighlightCommand: SaveHighlightCommand = {
      id: uuid,
      type: 'save_highlight',
      rootId: uuid,
      createdAt: new Date(),

      payload: hl,
    };
    await this.eventStore.store(saveHighlightCommand);

    const savedEntity = await this.highlightRepository.save(
      new HighlightEntity(hl),
    );
    const savedHighlight = new HighlightDto(savedEntity);

    const highlighSavedEvent: HighlightSavedEvent = {
      id: uuidv4(),
      originId: uuid,
      rootId: uuid,
      type: 'highlight_saved',

      createdAt: new Date(),

      payload: savedHighlight,
    };
    await this.eventStore.store(highlighSavedEvent);

    return savedHighlight;
  };

  list = async (): Promise<HighlightEntity[]> => {
    return Object.values(await this.highlightRepository.list());
  };
}
