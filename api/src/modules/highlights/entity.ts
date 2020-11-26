import { HighlightDto } from './dto/HighlightDto';

export class HighlightEntity {
  id: string;
  title: string;

  constructor(dto: HighlightDto) {
    Object.assign(this, dto);
  }
}
