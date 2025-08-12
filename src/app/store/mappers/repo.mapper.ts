import { ApiRepository, RepositoryData } from '../models/repo.model';


export function mapApiRepositoryToRepositoryData(repo: ApiRepository): RepositoryData {
  return {
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
  };
}

export function mapApiRepositoriesToRepositoryData(repos: ApiRepository[]): RepositoryData[] {
  return repos.map(mapApiRepositoryToRepositoryData);
}
