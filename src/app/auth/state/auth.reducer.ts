import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginSuccess } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  })
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return _authReducer(state, action);
}
