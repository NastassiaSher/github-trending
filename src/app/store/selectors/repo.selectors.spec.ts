import * as RepoSelectors from './repo.selectors';
import { RepoState } from '../reducers/repo.reducer';
import { Repo } from '../models/repo.model';

describe('Repo Selectors', () => {
  const repos: Repo[] = [
    {
      id: 1,
      name: 'Repo 1',
      description: 'Description 1',
      stargazersCount: 100,
      openIssuesCount: 5,
      owner: { login: 'owner1', avatarUrl: 'avatar1.png' },
      createdDate: '2025-07-01T12:00:00Z',
      myRating: 3
    }
  ];

  const initialState: RepoState = {
    repos,
    loading: false,
    error: null,
  };

  it('selectRepoState should select the repo state', () => {
    const result = RepoSelectors.selectRepoState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('selectRepos should return repos array', () => {
    const result = RepoSelectors.selectRepos.projector(initialState);
    expect(result).toEqual(repos);
  });

  it('selectLoading should return loading boolean', () => {
    const result = RepoSelectors.selectLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('selectError should return error string or null', () => {
    const result = RepoSelectors.selectError.projector(initialState);
    expect(result).toBeNull();
  });
});
