import { createSelector } from '@ngrx/store';
import { authAdapter, authFeatureState } from './auth.state';

export const selectCurrentUser = createSelector(
  authFeatureState,
  (state) => state.user
);

export const selectAuthToken = createSelector(
  selectCurrentUser,
  (user) => user?.token
);

export const selectAuthRefreshToken = createSelector(
  selectCurrentUser,
  (user) => user?.refrehToken
);
