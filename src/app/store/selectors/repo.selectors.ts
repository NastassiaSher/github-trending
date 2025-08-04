import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RepoState } from '../reducers/repo.reducer';

export const selectRepoState = createFeatureSelector<RepoState>('repo');

export const selectRepos = createSelector(
  selectRepoState,
  (state) => state.repos
);

export const selectLoading = createSelector(
  selectRepoState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectRepoState,
  (state) => state.error
);
