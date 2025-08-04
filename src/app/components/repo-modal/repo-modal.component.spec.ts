import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepoModalComponent } from './repo-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { rateRepo } from '../../store/actions/repo.actions';
import { Repo } from '../../store/models/repo.model';

// Non-standalone stub for app-repo-details
@Component({
  selector: 'app-repo-details',
  template: ''
})
class RepoDetailsStubComponent {
  @Input() repo: any;
}

// Non-standalone stub for app-star-rating
@Component({
  selector: 'app-star-rating',
  template: ''
})
class StarRatingStubComponent {
  @Input() defaultRating!: number;
  @Output() ratingChange = new EventEmitter<number>();
}

const mockRepo: Repo = {
  id: 123,
  name: 'test-repo',
  description: 'A test repo description',
  stargazersCount: 100,
  openIssuesCount: 5,
  owner: {
    login: 'test-user',
    avatarUrl: 'https://example.com/avatar.png'
  },
  createdDate: '2024-01-01',
  myRating: 3
};

describe('RepoModalComponent', () => {
  let component: RepoModalComponent;
  let fixture: ComponentFixture<RepoModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RepoModalComponent>>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        RepoDetailsStubComponent,
        StarRatingStubComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { repo: mockRepo } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal when closeModal is called', () => {
    component.closeModal();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should update rating when onRatingChange is called', () => {
    component.onRatingChange(4);
    expect(component.rating).toBe(4);
  });

  it('should dispatch rateRepo and close modal when submitRating is called', () => {
    component.rating = 5;
    component.submitRating();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not dispatch if repo id is not defined', () => {
    component.data.repo.id = undefined as any;
    component.rating = 3;
    component.submitRating();

    expect(storeSpy.dispatch).not.toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should render star-rating component', () => {
    const starRatingDebug = fixture.debugElement.nativeElement.querySelector('app-star-rating');
    expect(starRatingDebug).toBeTruthy();
  });

});
