import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { Login } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(Login, (state, { user }) => {
    return { ...state, user };
  })
);
