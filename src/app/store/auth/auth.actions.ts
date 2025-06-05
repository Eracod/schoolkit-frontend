import { createAction, props } from '@ngrx/store';
import { AuthUser } from '@shared/models/auth';

const SOURCE = '[Auth]';

export const Login = createAction(
  `${SOURCE} log in to account`,
  props<{ user: AuthUser }>()
);

export const Logout = createAction(`${SOURCE} log out of account`);

export const UpdateAuthTokens = createAction(
  `${SOURCE} update auth tokens`,
  props<{ update: any }>()
);
