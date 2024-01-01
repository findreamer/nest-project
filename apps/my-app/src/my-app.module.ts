import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/log.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 1、针对单个 control 设置中间件
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);

    // 2、forRoutes 匹配路由，可以是字符串、对象、和control列表
    // consumer.apply(LoggerMiddleware).forRoutes('cats');

    // 3、排除中间件路由,exclude
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);

    // 添加多个中间件
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
  }
}
