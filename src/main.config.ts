import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { loadingInterceptor } from './app/shared/interceptions/loading.interceptor';
import { authInterceptor } from './app/auth/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withFetch(), // ✅ Usa fetch per SSR compatibile
      withInterceptors([
        loadingInterceptor,
        authInterceptor
      ])
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
