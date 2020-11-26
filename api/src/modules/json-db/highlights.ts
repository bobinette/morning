import { HighlightEntity } from 'modules/highlights/entity';
import * as fs from 'fs';

export class JSONHighlightRepository {
  private filename = './db.json';

  list = (): Record<string, HighlightEntity> => {
    if (!fs.existsSync(this.filename)) {
      return {};
    }
    const content = fs.readFileSync(this.filename);
    return JSON.parse(content.toString());
  };

  save = (hl: HighlightEntity): HighlightEntity => {
    const db = this.list();
    db[hl.id] = Object.assign({}, db[hl.id] || {}, hl);
    fs.writeFileSync(this.filename, JSON.stringify(db));
    return db[hl.id];
  };
}
