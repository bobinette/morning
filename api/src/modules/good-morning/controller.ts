import { Controller, Get } from '@nestjs/common';
import { GoodMorningService } from './service';

@Controller('/good-morning')
export class GoodMorningController {
  constructor(private readonly appService: GoodMorningService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
