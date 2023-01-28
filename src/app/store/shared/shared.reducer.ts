import { Action, createReducer, on, State } from '@ngrx/store';
import { AppState } from '../app.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function sharedReducer(state: any, action: Action) {
  return _sharedReducer(state, action);
}
