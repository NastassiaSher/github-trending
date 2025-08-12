import { createReducer, on } from '@ngrx/store';
import { RepositoryData } from '../models/repo.model';
import * as RepoActions from '../actions/repo.actions';

export interface RepoState {
  repos: RepositoryData[];
  loading: boolean;
  error: string | null;
}

export const initialState: RepoState = {
  repos: [],
  loading: false,
  error: null,
};

export const repoReducer = createReducer(
  initialState,
  on(RepoActions.loadRepos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RepoActions.loadReposSuccess, (state, { repos }) => ({
    ...state,
    loading: false,
    repos: [...state.repos, ...repos],
  })),
  on(RepoActions.loadReposFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RepoActions.rateRepo, (state, { repoId, rating }) => ({
    ...state,
    repos: state.repos.map(repo =>
      repo.id === repoId
        ? {
            ...repo,
            metaInformation: {
              ...repo.metaInformation,
              myRating: rating,
            },
          }
        : repo
    ),
  }))
);
