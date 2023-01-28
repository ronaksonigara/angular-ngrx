import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoadingSpinner = createSelector(
  getSharedState,
  (state) => state.showLoading
);

export const getErrorMessage = createSelector(
  getSharedState,
  (state) => state.errorMessage
);
