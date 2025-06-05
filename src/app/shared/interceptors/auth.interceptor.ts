import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { ApiResponse } from '@shared/models/base.model';
import * as AuthStore from '@store/auth';
import { State } from '@store/index';
import {
  catchError,
  firstValueFrom,
  from,
  switchMap,
  take,
  throwError,
} from 'rxjs';
let isRefreshing = false;
let refreshTokenInProgress: Promise<string | null> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);
  const http = inject(HttpClient);

  return store.select(AuthStore.selectCurrentUser).pipe(
    take(1),
    switchMap((user) => {
      const authReq = user
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          })
        : req;

      return next(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (
              error.status === 401 &&
              !req.url.includes('/v1/auth/refresh-token')
            ) {
              return from(refreshAccessToken(store, http)).pipe(
                switchMap((newToken) => {
                  if (newToken) {
                    const retryReq = req.clone({
                      setHeaders: { Authorization: `Bearer ${newToken}` },
                    });
                    return next(retryReq);
                  }
                  logout(store, router);
                  return throwError(() => error);
                }),
                catchError(() => {
                  logout(store, router);
                  return throwError(() => error);
                })
              );
            }
          }
          return throwError(() => error);
        })
      );
    })
  );
};

const refreshAccessToken = (
  store: Store<State>,
  http: HttpClient
): Promise<string | null> => {
  if (isRefreshing && refreshTokenInProgress) {
    return refreshTokenInProgress;
  }

  isRefreshing = true;
  refreshTokenInProgress = new Promise(async (resolve) => {
    try {
      const refreshToken = await firstValueFrom(
        store.select(AuthStore.selectAuthRefreshToken).pipe(take(1))
      );

      if (!refreshToken) {
        resolve(null);
        return;
      }

      const response = await firstValueFrom(
        http.post<ApiResponse<any>>(
          `${environment.apiURL}/auth/refresh-token`,
          {
            token: refreshToken,
          }
        )
      );

      const tokens = response.data;
      if (tokens) {
        store.dispatch(
          AuthStore.UpdateAuthTokens({
            update: tokens,
          })
        );
        resolve(tokens.accessToken);
      } else {
        resolve(null);
      }
    } catch {
      resolve(null);
    } finally {
      isRefreshing = false;
      refreshTokenInProgress = null;
    }
  });

  return refreshTokenInProgress;
};

const logout = (store: Store, router: Router) => {
  store.dispatch(AuthStore.Logout());
  router.navigateByUrl('/identity/login');
};
