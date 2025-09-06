import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();

    console.log(`📥 [${method}] ${url} - Incoming`);

    return next.handle().pipe(
      tap({
        next: () => console.log(`✅ [${method}] ${url} - ${Date.now() - now}ms`),
        error: (err) => console.error(`❌ [${method}] ${url} - Error: ${err.message}`),
      }),
    );
  }
}
