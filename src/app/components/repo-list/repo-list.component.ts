import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppState } from '../../store/reducers/index';
import { loadRepos } from '../../store/actions/repo.actions';
import { selectRepos, selectLoading } from '../../store/selectors/repo.selectors';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';
import { RepositoryData } from '../../store/models/repo.model';


@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, RepoDetailsComponent, MatProgressSpinnerModule],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements AfterViewInit, OnDestroy {
  private store = inject(Store<AppState>);
  private dialog = inject(MatDialog);

  private readonly dialogMaxWidth = '800px';

  repos = this.store.selectSignal(selectRepos);
  loading = this.store.selectSignal(selectLoading);

  currentPage = signal(1);

  @ViewChild('anchor', { static: true }) anchor!: ElementRef;
  private observer!: IntersectionObserver;

  constructor() {
    this.store.dispatch(loadRepos({ page: this.currentPage() }));
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.loading()) {
        this.loadMore();
      }
    });

    if (this.anchor) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  trackByRepoId(index: number, repo: RepositoryData): number {
    return repo.id;
  }

  loadMore() {
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.store.dispatch(loadRepos({ page: nextPage }));
  }

  openModal(event: number) {
    const selectedRepo = this.repos().find(repo => repo.id === event);
    this.dialog.open(RepoModalComponent, {
      data: {
        repo: selectedRepo
      },
      maxWidth: this.dialogMaxWidth,
      width: '90%'
    });
  }
  
}
