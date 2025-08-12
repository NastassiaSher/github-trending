export interface RepositoryInformation {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  createdDate: string;
}

export interface MetaInformation {
  stargazersCount: number;
  openIssuesCount: number;
  myRating?: number;
}

export interface Owner {
  login: string;
  avatarUrl: string;
}

export interface RepositoryData {
  id: number;
  repositoryInformation: RepositoryInformation;
  metaInformation: MetaInformation;
  owner: Owner;
}