import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://api.github.com/search/repositories';

  getTrendingRepos(page = 1): Observable<any> {
    const date30DaysAgo = this.getDate30DaysAgo();
    const query = `q=created:>${date30DaysAgo}&sort=stars&order=desc&page=${page}`;
    const url = `${this.BASE_URL}?${query}`;

    return this.http.get(url);
  }

  private getDate30DaysAgo(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0]; // returns YYYY-MM-DD
  }

}
