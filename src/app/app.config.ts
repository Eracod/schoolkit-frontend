import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { debounceTime, Observable } from 'rxjs';
import { BeforeAppInit } from '@ngrx-addons/common';
import { providePersistStore } from '@ngrx-addons/persist-state';
import { metaReducers, reducers } from './store';
import localForage from 'localforage';
import { authInterceptor } from '@shared/interceptors/auth.interceptor';

const storageKeyPrefix = 'schoolkit';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({ timeOut: 2000, positionClass: 'toast-top-right' }),
    provideStore(reducers, { metaReducers }),
    provideEffects(),
    providePersistStore<typeof reducers>({
      states: Object.keys(reducers).map((key: any) => ({
        key,
        storage: localForage.createInstance({
          driver: localForage.INDEXEDDB,
          name: 'SchoolKit',
          description: 'Manage schoolkit application state',
          storeName: 'SchoolKitStore',
          version: 1,
        }),
        runGuard: () => typeof window !== 'undefined',
        source: (state: Observable<any>) => state.pipe(debounceTime(100)),
        storageKey: `${key}@store`,
        migrations: [],
        skip: 1,
      })),
      // optional root options (for all, also feature states)
      storageKeyPrefix,
      // optional rehydration strategy
      strategy: BeforeAppInit, // or AfterAppInit
    }),
  ],
};
