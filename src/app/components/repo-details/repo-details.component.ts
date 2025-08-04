import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

import { Repo } from '../../store/models/repo.model';
import { ShortNumberPipe } from '../../shared/pipes/short-number.pipe';




@Component({
  selector: 'app-repo-details',
  imports: [MatIconModule, MatChipsModule, ShortNumberPipe],
  templateUrl: './repo-details.component.html',
  styleUrl: './repo-details.component.scss'
})
export class RepoDetailsComponent {

  @Input() repo!: Repo;

  @Output() nameClick = new EventEmitter<number>();

  getSubmittedAgo(dateString: string): number {
    const createdDate = new Date(dateString);
    const now = new Date();

    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  onNameClick() {
    this.nameClick.emit(this.repo.id);
  }

}
