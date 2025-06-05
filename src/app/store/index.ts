import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as AuthStore from './auth';

export interface State {
  [AuthStore.authFeatureKey]: AuthStore.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  [AuthStore.authFeatureKey]: AuthStore.authReducer,
};

export function clearStateMetaReducer<State>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function (state, action) {
    if (action.type === AuthStore.Logout.type) {
      state = undefined; // reset all state
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = isDevMode()
  ? [clearStateMetaReducer]
  : [clearStateMetaReducer];
