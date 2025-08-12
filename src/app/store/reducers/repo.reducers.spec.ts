import { repoReducer, initialState, RepoState } from './repo.reducer';
import * as RepoActions from '../actions/repo.actions';
import { RepositoryData } from '../models/repo.model';

describe('repoReducer', () => {
  const repo1: RepositoryData = {
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
      myRating: 2,
    },
    owner: {
      login: 'owner1',
      avatarUrl: 'avatar1.png',
    },
  };

  const repo2: RepositoryData = {
    id: 2,
    repositoryInformation: {
      name: 'Repo 2',
      fullName: 'owner2/repo-2',
      htmlUrl: 'https://github.com/owner2/repo-2',
      description: 'Description 2',
      createdDate: '2025-07-02T12:00:00Z',
    },
    metaInformation: {
      stargazersCount: 50,
      openIssuesCount: 3,
      // myRating omitted here
    },
    owner: {
      login: 'owner2',
      avatarUrl: 'avatar2.png',
    },
  };


  it('should return the initial state by default', () => {
    const action = { type: 'Unknown' } as any;
    const state = repoReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should set loading true and error null on loadRepos', () => {
    const action = RepoActions.loadRepos({ page: 1 });
    const state = repoReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should add repos and set loading false on loadReposSuccess', () => {
    const startingState: RepoState = { ...initialState, repos: [repo1], loading: true };
    const newRepos = [repo2];
    const action = RepoActions.loadReposSuccess({ repos: newRepos });
    const state = repoReducer(startingState, action);
    expect(state.loading).toBeFalse();
    expect(state.repos.length).toBe(2);
    expect(state.repos).toEqual([repo1, repo2]);
  });

  it('should set error and loading false on loadReposFailure', () => {
    const startingState: RepoState = { ...initialState, loading: true };
    const error = 'Failed to load';
    const action = RepoActions.loadReposFailure({ error });
    const state = repoReducer(startingState, action);
    expect(state.loading).toBeFalse();
    expect(state.error).toBe(error);
  });

  it('should update myRating for the matching repo on rateRepo', () => {
    const startingState: RepoState = { ...initialState, repos: [repo1, repo2] };
    const newRating = 4;
    const action = RepoActions.rateRepo({ repoId: repo1.id, rating: newRating });
    const state = repoReducer(startingState, action);
    const updatedRepo = state.repos.find(r => r.id === repo1.id);
    expect(updatedRepo?.metaInformation.myRating).toBe(newRating);

    // Other repo ratings should remain unchanged (or undefined)
    const otherRepo = state.repos.find(r => r.id === repo2.id);
    expect(otherRepo?.metaInformation.myRating).toBeUndefined();
  });
});
