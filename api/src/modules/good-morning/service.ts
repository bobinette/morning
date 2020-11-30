import { Injectable } from '@nestjs/common';

@Injectable()
export class GoodMorningService {
  getHello(): string {
    return `Good Morning ${process.env.ENV_NAME}!`;
  }
}
