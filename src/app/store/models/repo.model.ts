export interface Owner {
  login: string;
  avatarUrl: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazersCount: number;
  openIssuesCount: number;
  htmlUrl: string;
  owner: Owner;
  rating?: number;
  createdDate: string;
}