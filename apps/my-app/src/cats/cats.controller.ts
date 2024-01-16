import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
  UseFilters,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { type Request } from 'express';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateCatDto, createCartSchema } from './create-cat.dto';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import {LoggingInterceptor} from '../interceptor/LoggingInterceptor'
@Controller('cats')
// @UseFilters(HttpExceptionFilter) 针对整个控制器添加异常过滤器
@UseGuards(RolesGuard) // 针对整个控制器绑定守卫
@UseInterceptors(LoggingInterceptor) // 绑定拦截器
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Req() req: Request, @Query('id') id: number): any {
    if (id) {
      return { data: `查找猫咪 ${id}` };
    }
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
  @UsePipes(new ValidationPipe(createCartSchema))
  @UseGuards(RolesGuard) // 针对单个方法绑定守卫
  @Roles('admin') // 只有管理员才能调用此api
  create(@Body() createCatDto: CreateCatDto) {
    // throw new HttpException(
    //   { status: 403, message: 'Forbidden', error: data },
    //   HttpStatus.FORBIDDEN,
    // );

    this.catsService.create(createCatDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //访问/cats/abc 接口返回 {"statusCode":400,"timestamp":"2024-01-01T07:48:49.984Z","path":"/cats/abc"}
    return this.catsService.findOne(id);
  }
}
