import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoDetailsComponent } from './repo-details.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ShortNumberPipe } from '../../shared/pipes/short-number.pipe';  // <-- your real pipe
import { RepositoryData } from '../../store/models/repo.model';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: '<div class="mock-star-rating"></div>'
})
class MockStarRatingComponent {
  @Input() defaultRating!: number;
}

describe('RepoDetailsComponent', () => {
  let component: RepoDetailsComponent;
  let fixture: ComponentFixture<RepoDetailsComponent>;

  const mockRepo: RepositoryData = {
    id: 1,
    repositoryInformation: {
      name: 'angular',
      fullName: 'angular/angular',
      htmlUrl: 'https://github.com/angular/angular',
      description: 'Popular framework for building web apps.',
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    metaInformation: {
      stargazersCount: 123456,
      openIssuesCount: 42,
      myRating: 4,
    },
    owner: {
      login: 'angular',
      avatarUrl: 'https://avatars.githubusercontent.com/u/139426?v=4',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RepoDetailsComponent,
        MockStarRatingComponent,
        ShortNumberPipe,
        MatIconModule,
        MatChipsModule,
        CommonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepoDetailsComponent);
    component = fixture.componentInstance;
    component.repo = mockRepo;
    fixture.detectChanges();
  });

  it('should render repo name', () => {
    const nameEl = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(nameEl.textContent).toContain(mockRepo.repositoryInformation.name);
  });

  it('should emit nameClick event with repo id on name click', () => {
    spyOn(component.nameClick, 'emit');
    const nameEl = fixture.debugElement.query(By.css('h5'));
    nameEl.triggerEventHandler('click', null);
    expect(component.nameClick.emit).toHaveBeenCalledWith(mockRepo.id);
  });

  it('should display the avatar image with correct src and alt', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain(mockRepo.owner.avatarUrl);
    expect(imgEl.alt).toBe(mockRepo.owner.login);
  });

  it('should display the description with title attribute', () => {
    const descEl = fixture.debugElement.query(By.css('.text-muted')).nativeElement;
    expect(descEl.textContent).toContain(mockRepo.repositoryInformation.description);
    expect(descEl.getAttribute('title')).toBe(mockRepo.repositoryInformation.description);
  });

  it('should display star and issue counts formatted by shortNumber pipe', () => {
    const chips = fixture.debugElement.queryAll(By.css('.chip'));
    const starsChip = chips[0].nativeElement;
    const issuesChip = chips[1].nativeElement;

    expect(starsChip.textContent).toContain('Stars');
    expect(issuesChip.textContent).toContain('Issues');

    expect(starsChip.textContent).toContain('123'); 
    expect(issuesChip.textContent).toContain('42');
  });

  it('should show <app-star-rating> when shouldShowStarRating returns true', () => {
    component.repo.metaInformation.myRating = 3;
    fixture.detectChanges();
    const starRating = fixture.debugElement.query(By.css('app-star-rating'));
    expect(starRating).toBeTruthy();
    expect(starRating.componentInstance.defaultRating).toBe(3);
  });

  it('should NOT show <app-star-rating> when myRating is 0', () => {
    component.repo.metaInformation.myRating = 0;
    fixture.detectChanges();
    const starRating = fixture.debugElement.query(By.css('app-star-rating'));
    expect(starRating).toBeNull();
  });

  it('should calculate days ago correctly', () => {
    const daysAgo = component.getSubmittedAgo(mockRepo.repositoryInformation.createdDate);
    expect(daysAgo).toBe(3);
  });
});
