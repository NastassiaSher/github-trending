import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Repo } from '../../store/models/repo.model';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';

@Component({
  selector: 'app-repo-modal.component',
  imports: [MatIconModule, RepoDetailsComponent],
  templateUrl: './repo-modal.component.html',
  styleUrl: './repo-modal.component.scss'
})
export class RepoModalComponent implements OnInit{

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

}
