import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { loadingInterceptor } from './app/shared/interceptions/loading.interceptor';
import { authInterceptor } from './app/auth/auth.interceptor';

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
    )
  ]
};
