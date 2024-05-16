import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.urlWithParams);

    if (cachedResponse && cachedResponse.expireDate > Date.now()) {
      return of(cachedResponse.response);
    }

    if (cachedResponse) {
      this.cache.delete(request.urlWithParams);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.urlWithParams, {
            response: event,
            expireDate: new Date(Date.now() + 5000),
          });
        }
      })
    );
  }
}
