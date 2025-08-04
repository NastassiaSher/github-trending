import * as RepoActions from './repo.actions';
import { Repo } from '../models/repo.model';

describe('Repo Actions', () => {
  it('should create loadRepos action', () => {
    const page = 2;
    const action = RepoActions.loadRepos({ page });

    expect(action.type).toBe('[Repo] Load Repos');
    expect(action.page).toBe(page);
  });

  it('should create loadReposSuccess action', () => {
    const repos: Repo[] = [
      {
        id: 1,
        name: 'Repo 1',
        description: 'Description 1',
        stargazersCount: 100,
        openIssuesCount: 5,
        owner: { login: 'owner1', avatarUrl: 'avatar1.png' },
        createdDate: '2025-07-01T12:00:00Z',
        rating: 4,
        myRating: 5
      },
      {
        id: 2,
        name: 'Repo 2',
        description: 'Description 2',
        stargazersCount: 200,
        openIssuesCount: 10,
        owner: { login: 'owner2', avatarUrl: 'avatar2.png' },
        createdDate: '2025-07-02T12:00:00Z',
      }
    ];

    const action = RepoActions.loadReposSuccess({ repos });

    expect(action.type).toBe('[Repo] Load Repos Success');
    expect(action.repos).toBe(repos);
  });

  it('should create loadReposFailure action', () => {
    const error = 'Failed to load repos';
    const action = RepoActions.loadReposFailure({ error });

    expect(action.type).toBe('[Repo] Load Repos Failure');
    expect(action.error).toBe(error);
  });

  it('should create rateRepo action', () => {
    const repoId = 123;
    const rating = 5;
    const action = RepoActions.rateRepo({ repoId, rating });

    expect(action.type).toBe('[Repo] Rate Repo');
    expect(action.repoId).toBe(repoId);
    expect(action.rating).toBe(rating);
  });
});
