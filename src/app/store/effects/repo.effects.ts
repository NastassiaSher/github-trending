import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GithubApiService } from '../../services/github-api.service';
import * as RepoActions from '../actions/repo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RepositoryData } from '../models/repo.model';

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
            const trimmedRepos: RepositoryData[] = response.items.map((repo: any) => ({
              id: repo.id,
              repositoryInformation: {
                name: repo.name,
                fullName: repo.full_name,
                htmlUrl: repo.html_url,
                description: repo.description,
                createdDate: repo.created_at,
              },
              metaInformation: {
                stargazersCount: repo.stargazers_count,
                openIssuesCount: repo.open_issues_count,
              },
              owner: {
                login: repo.owner.login,
                avatarUrl: repo.owner.avatar_url,
              },
            }));
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
