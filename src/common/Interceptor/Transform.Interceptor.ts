import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { CommonResponse } from '../dto/CommonResponse.model';

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
      catchError((err) =>
        of({
          code: err.getStatus(),
          message: err.message,
          data: null,
        }),
      ),
    );
  }
}
