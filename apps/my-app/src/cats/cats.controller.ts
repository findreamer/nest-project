import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
  UseFilters,
  Post,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) 针对整个控制器添加异常过滤器
export class CatsController {
  @Get()
  findAll(@Req() req: Request): object {
    return req.query;
  }

  @Get('name')
  getName() {
    return 'lucky';
  }

  // 异常过滤器
  @Get('error')
  testError() {
    throw new HttpException(
      // 对象写法，{ status: 403, message: 'Forbidden' },
      'Forbidden', // 字符串写法
      HttpStatus.FORBIDDEN,
    );
  }

  @Post()
  @UseFilters(HttpExceptionFilter) // 针对单个路由添加异常过滤器
  create(@Body() data: any) {
    throw new HttpException(
      { status: 403, message: 'Forbidden', error: data },
      HttpStatus.FORBIDDEN,
    );
  }
}
