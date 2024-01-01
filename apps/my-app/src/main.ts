import { NestFactory } from '@nestjs/core';
import { MyAppModule } from './my-app.module';

async function bootstrap() {
  const app = await NestFactory.create(MyAppModule);

  // 添加全局中间件
  // app.use(logger)
  await app.listen(3000);
}
bootstrap();
