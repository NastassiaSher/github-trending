import * as RepoSelectors from './repo.selectors';
import { RepoState } from '../reducers/repo.reducer';
import { RepositoryData } from '../models/repo.model';

describe('Repo Selectors', () => {
  const repos: RepositoryData[] = [
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
        myRating: 3,
      },
      owner: {
        login: 'owner1',
        avatarUrl: 'avatar1.png'
      },
    },
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
