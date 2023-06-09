import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { CommonResponse } from '../dto/CommonResponse.model';
import { error } from 'console';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CommonResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: '请求成功',
        ...data,
      })),
      catchError((err) => {
        return of({
          code: err?.getStatus() || 500,
          message: err.message,
          data: null,
        });
      }),
    );
  }
}
