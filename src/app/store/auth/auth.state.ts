import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { AuthUser } from '@shared/models/auth';
export interface AuthState extends EntityState<any> {
  user: AuthUser | null;
}

export const authAdapter = createEntityAdapter<any>();

export const initialAuthState = authAdapter.getInitialState<AuthState>({
  user: null,
  entities: {},
  ids: [],
});

export const authFeatureKey = 'auth';

export const authFeatureState =
  createFeatureSelector<AuthState>(authFeatureKey);
