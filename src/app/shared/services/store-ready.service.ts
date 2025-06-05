import { Injectable } from '@angular/core';
import { REHYDRATE } from '@ngrx-addons/persist-state';
import { Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, raceWith, take, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreReadyService {
  private readonly _ready$ = new BehaviorSubject<boolean>(false);

  constructor(private actions$: Actions) {
    // Emit "true" once either REHYDRATE fires or timeout occurs
    this.actions$
      .pipe(
        ofType(REHYDRATE),
        take(1),
        raceWith(timer(200)),
        tap(() => this._ready$.next(true))
      )
      .subscribe();
  }

  get ready$() {
    return this._ready$.asObservable();
  }
}
