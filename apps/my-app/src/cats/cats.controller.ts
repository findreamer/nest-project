import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() req: Request): object {
    return req.query;
  }

  @Get('name')
  getName() {
    return 'lucky';
  }
}
