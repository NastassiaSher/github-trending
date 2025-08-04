import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoListComponent } from './repo-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectRepos, selectLoading } from '../../store/selectors/repo.selectors';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Repo } from '../../store/models/repo.model';
import { By } from '@angular/platform-browser';


const matDialogMock = {
  open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) })
};

const mockRepos: Repo[] = [
  {
    id: 1,
    name: 'Angular',
    description: 'Framework',
    stargazersCount: 100,
    openIssuesCount: 5,
    createdDate: new Date().toISOString(),
    owner: { login: 'angular', avatarUrl: 'avatar.png' },
    myRating: 4
  },
  {
    id: 2,
    name: 'React',
    description: 'Library',
    stargazersCount: 200,
    openIssuesCount: 10,
    createdDate: new Date().toISOString(),
    owner: { login: 'facebook', avatarUrl: 'avatar2.png' },
    myRating: 5
  }
];

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoListComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectRepos, value: mockRepos },
            { selector: selectLoading, value: false }
          ]
        }),
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repo list', () => {
    const repoEls = fixture.debugElement.queryAll(By.css('app-repo-details'));
    expect(repoEls.length).toBe(2);
    expect(repoEls[0].nativeElement.textContent).toContain('Angular');
  });

  it('should show loading spinner if loading is true', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should open modal with selected repo', () => {
    const repoId = 1;
    component.openModal(repoId);
    expect(matDialogMock.open).toHaveBeenCalled();
    const data = matDialogMock.open.calls.mostRecent().args[1].data;
    expect(data.repo.id).toBe(repoId);
  });

  it('should dispatch loadRepos on loadMore', () => {
    spyOn(store, 'dispatch');
    const prevPage = component.currentPage();
    component.loadMore();
    expect(component.currentPage()).toBe(prevPage + 1);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
