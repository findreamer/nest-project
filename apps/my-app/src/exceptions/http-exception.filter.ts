import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

// 自定义一个异常过滤器

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 该 exception 参数是当前正在处理的异常对象。该host参数是一个 ArgumentsHost 对象。
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const requset = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: requset.url,
    });
  }
}
