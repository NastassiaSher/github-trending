import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { RepositoryData } from '../../store/models/repo.model';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { AppState } from '../../store/reducers';
import { rateRepo } from '../../store/actions/repo.actions';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';

@Component({
  selector: 'app-repo-modal.component',
  imports: [RepoDetailsComponent, StarRatingComponent],
  templateUrl: './repo-modal.component.html'
})
export class RepoModalComponent {

  private store = inject(Store<AppState>);

  rating = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {repo: RepositoryData}, 
    private dialogRef: MatDialogRef<RepoModalComponent>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  onRatingChange(newRating: number) {
    this.rating = newRating;
  }

  submitRating() {
    if (this.data.repo?.id) {
      this.store.dispatch(rateRepo({ repoId: this.data.repo.id, rating: this.rating }));
    }
    this.dialogRef.close();
  }

}
