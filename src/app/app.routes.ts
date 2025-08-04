import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'repos',
        pathMatch: 'full'
      },
      {
        path: 'repos',
        component: RepoListComponent,
        title: 'Trending GitHub Repos'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'repos'
  }
];
