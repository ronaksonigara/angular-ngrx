import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getToken } from '../auth/state/auth.selectors';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        let modifiedReq = request.clone({
          params: request.params.append('auth', token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
