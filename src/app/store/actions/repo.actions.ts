import { createAction, props } from '@ngrx/store';
import { Repo } from '../models/repo.model';

export const loadRepos = createAction(
  '[Repo] Load Repos',
  props<{ page: number }>()
);

export const loadReposSuccess = createAction(
  '[Repo] Load Repos Success',
  props<{ repos: Repo[] }>()
);

export const loadReposFailure = createAction(
  '[Repo] Load Repos Failure',
  props<{ error: string }>()
);

export const rateRepo = createAction(
  '[Repo] Rate Repo',
  props<{ repoId: number; rating: number }>()
);