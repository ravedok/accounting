import { createReducer, on, Action } from '@ngrx/store';
import { User } from './user.model';
import * as authActions from './auth.actions';

export interface AuthState {
  user: User;
}

export interface AppState {
  auth: AuthState;
}

export const initialState = {
  user: null
};

const authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, { user }) => ({ ...state, user })),
  on(authActions.clearUser, state => ({ ...state, user: null }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
