import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Repo } from '../../store/models/repo.model';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { AppState } from '../../store/reducers';
import { rateRepo } from '../../store/actions/repo.actions';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';

@Component({
  selector: 'app-repo-modal.component',
  imports: [RepoDetailsComponent, StarRatingComponent],
  templateUrl: './repo-modal.component.html',
  styleUrl: './repo-modal.component.scss'
})
export class RepoModalComponent implements OnInit{

  private store = inject(Store<AppState>);

  rating = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {repo: Repo}, 
    private dialogRef: MatDialogRef<RepoModalComponent>
  ) {}

  ngOnInit(): void {
    console.log('RepoModalComponent initialized with props:', this.data);
  }

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
