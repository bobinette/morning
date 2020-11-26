import { Body, Controller, Get, Post } from '@nestjs/common';
import { HighlightDto } from './dto/HighlightDto';
import { HighlightService } from './service';

@Controller('/highlights')
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) {}

  @Get()
  async list(): Promise<HighlightDto[]> {
    const entities = await this.highlightService.list();
    return entities.map((e) => new HighlightDto(e));
  }

  @Post()
  async save(@Body() hl: HighlightDto): Promise<HighlightDto> {
    return await this.highlightService.save(hl);
  }
}
