import { IsNotEmpty, IsNumber } from 'class-validator';
import { HighlightEntity } from '../entity';

export class HighlightDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  constructor(entity: HighlightEntity) {
    Object.assign(this, entity);
  }
}
