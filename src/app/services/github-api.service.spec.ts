import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });

    service = TestBed.inject(GithubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending repositories with default page', () => {
    const mockResponse = { items: [] };
    const today = new Date();
    today.setDate(today.getDate() - 30);
    const expectedDate = today.toISOString().split('T')[0];
    const expectedUrl = `https://api.github.com/search/repositories?q=created:>${expectedDate}&sort=stars&order=desc&page=1`;

    service.getTrendingRepos().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch trending repositories with specified page', () => {
    const mockResponse = { items: [] };
    const page = 3;
    const today = new Date();
    today.setDate(today.getDate() - 30);
    const expectedDate = today.toISOString().split('T')[0];
    const expectedUrl = `https://api.github.com/search/repositories?q=created:>${expectedDate}&sort=stars&order=desc&page=${page}`;

    service.getTrendingRepos(page).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return a date string from 30 days ago', () => {
    const spy = jasmine.createSpyObj('GithubApiService', [], {
      getDate30DaysAgo: service['getDate30DaysAgo'].bind(service)
    });
    const dateStr = spy.getDate30DaysAgo();
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - 30);
    const actual = expectedDate.toISOString().split('T')[0];

    expect(dateStr).toBe(actual);
  });
});
