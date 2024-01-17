import { Injectable, ExecutionContext, CallHandler, NestInterceptor, BadGatewayException } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

// 处理异常映射
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(catchError(err => throwError(new BadGatewayException(err))))
    }
}