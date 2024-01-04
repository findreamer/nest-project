import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';

// 校验函数
const validateRequest = (req: Request) => {
  const token = req.headers['x-token'];
  return !!token;
};

// 定义一个授权守卫
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取到request
    const request = context.switchToHttp().getRequest();
    // 校验request token
    return validateRequest(request);
  }
}
