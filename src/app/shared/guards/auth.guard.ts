import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreReadyService } from '@shared/services/store-ready.service';
import { selectCurrentUser } from '@store/auth';
import { filter, map, switchMap, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const storeReady = inject(StoreReadyService);

  return storeReady.ready$.pipe(
    filter((ready) => ready),
    switchMap(() => store.select(selectCurrentUser)),
    take(1),
    map((user) => !!user),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['']);
      }
    })
  );
};
