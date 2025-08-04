import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GithubApiService } from '../../services/github-api.service';
import * as RepoActions from '../actions/repo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Repo } from '../models/repo.model'

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
                        const trimmedRepos: Repo[] = response.items.map((repo: any) => ({
                            id: repo.id,
                            name: repo.name,
                            description: repo.description,
                            stargazersCount: repo.stargazers_count,
                            openIssuesCount: repo.open_issues_count,
                            htmlUrl: repo.html_url,
                            owner: {
                                login: repo.owner.login,
                                avatarUrl: repo.owner.avatar_url,
                            },
                            createdDate: repo.created_at
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
