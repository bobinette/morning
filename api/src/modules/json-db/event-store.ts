import * as fs from 'fs';
import { HighlightDto } from 'modules/highlights/dto/HighlightDto';

// This is a command: it can fail
export interface SaveHighlightCommand {
  id: string; // The command id, not the highlight id
  originId?: string; // The id of the previous command/event
  rootId: string; // The id of the first command/event that generated this one
  type: 'save_highlight';

  createdAt: Date;

  payload: Pick<HighlightDto, 'id'> & Partial<HighlightDto>;
}

// This is an event: it happened, you can never go back
export interface HighlightSavedEvent {
  id: string; // The command id, not the highlight id
  originId?: string; // The id of the previous command/event
  rootId: string; // The id of the first command/event that generated this one
  type: 'highlight_saved';

  createdAt: Date;

  payload: HighlightDto;
}

type EventOrCommand = SaveHighlightCommand | HighlightSavedEvent;

export class EventStore {
  private filename = './events.json';

  list(): EventOrCommand[] {
    if (!fs.existsSync(this.filename)) {
      return [];
    }

    const content = fs.readFileSync(this.filename);
    return JSON.parse(content.toString());
  }

  store(event: EventOrCommand): EventOrCommand {
    const events = [...this.list(), event];
    fs.writeFileSync(this.filename, JSON.stringify(events, null, 2));
    return event;
  }
}
