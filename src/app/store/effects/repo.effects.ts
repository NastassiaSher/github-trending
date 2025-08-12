import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GithubApiService } from '../../services/github-api.service';
import * as RepoActions from '../actions/repo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { mapApiRepositoriesToRepositoryData } from '../mappers/repo.mapper';

@Injectable()
export class RepoEffects {
  private actions$ = inject(Actions);
  private githubService = inject(GithubApiService);

  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.loadRepos),
      mergeMap(({ page }) =>
        this.githubService.getTrendingRepos(page).pipe(
          map((response) => {
            const trimmedRepos = mapApiRepositoriesToRepositoryData(response.items);
            return RepoActions.loadReposSuccess({ repos: trimmedRepos });
          }),
          catchError((error) =>
            of(RepoActions.loadReposFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
