import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { RepoEffects } from './repo.effects';
import * as RepoActions from '../actions/repo.actions';
import { GithubApiService } from '../../services/github-api.service';
import { RepositoryData } from '../models/repo.model';

describe('RepoEffects', () => {
  let actions$: Observable<any>;
  let effects: RepoEffects;
  let githubService: jasmine.SpyObj<GithubApiService>;

  beforeEach(() => {
    const githubSpy = jasmine.createSpyObj('GithubApiService', ['getTrendingRepos']);

    TestBed.configureTestingModule({
      providers: [
        RepoEffects,
        provideMockActions(() => actions$),
        { provide: GithubApiService, useValue: githubSpy }
      ]
    });

    effects = TestBed.inject(RepoEffects);
    githubService = TestBed.inject(GithubApiService) as jasmine.SpyObj<GithubApiService>;
  });

  it('should dispatch loadReposSuccess on successful loadRepos', (done) => {
    const mockApiResponse = {
      items: [
        {
          id: 1,
          name: 'Repo 1',
          full_name: 'owner1/repo-1',
          html_url: 'https://github.com/owner1/repo-1',
          description: 'Description 1',
          stargazers_count: 100,
          open_issues_count: 5,
          owner: { login: 'owner1', avatar_url: 'avatar1.png' },
          created_at: '2025-07-01T12:00:00Z'
        }
      ]
    };

    const expectedRepos: RepositoryData[] = [
      {
        id: 1,
        repositoryInformation: {
          name: 'Repo 1',
          fullName: 'owner1/repo-1',
          htmlUrl: 'https://github.com/owner1/repo-1',
          description: 'Description 1',
          createdDate: '2025-07-01T12:00:00Z',
        },
        metaInformation: {
          stargazersCount: 100,
          openIssuesCount: 5,
        },
        owner: {
          login: 'owner1',
          avatarUrl: 'avatar1.png',
        },
      },
    ];

    const page = 1;

    githubService.getTrendingRepos.and.returnValue(of(mockApiResponse));
    actions$ = of(RepoActions.loadRepos({ page }));

    effects.loadRepos$.subscribe(action => {
      expect(action).toEqual(RepoActions.loadReposSuccess({ repos: expectedRepos }));
      done();
    });
  });

  it('should dispatch loadReposFailure on failed loadRepos', (done) => {
    const errorResponse = new Error('Network error');

    githubService.getTrendingRepos.and.returnValue(throwError(() => errorResponse));
    actions$ = of(RepoActions.loadRepos({ page: 1 }));

    effects.loadRepos$.subscribe(action => {
      expect(action).toEqual(RepoActions.loadReposFailure({ error: errorResponse.message }));
      done();
    });
  });
});
