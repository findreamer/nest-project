import { Controller, Get } from '@nestjs/common';
import { MyAppService } from './my-app.service';
import { CatsService } from '../src/cats/cats.service';

@Controller()
export class MyAppController {
  constructor(
    private readonly myAppService: MyAppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.myAppService.getHello() + this.catsService.run();
  }
}
