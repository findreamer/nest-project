import { NestFactory } from '@nestjs/core';
import { MyAppModule } from './my-app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(MyAppModule);

  // 添加全局中间件
  // app.use(logger)

  // 添加全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 添加全局管道
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
