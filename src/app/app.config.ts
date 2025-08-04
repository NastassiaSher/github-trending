import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { reducers } from './store/reducers';
import { RepoEffects } from './store/effects/repo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(reducers),
    provideEffects([RepoEffects]),
    provideStoreDevtools({
      name: 'GitHub Repo Explorer',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
