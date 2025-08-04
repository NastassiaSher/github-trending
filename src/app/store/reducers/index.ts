import { ActionReducerMap } from '@ngrx/store';
import { repoReducer, RepoState } from './repo.reducer';

export interface AppState {
  repo: RepoState;
}

export const reducers: ActionReducerMap<AppState> = {
  repo: repoReducer,
};
