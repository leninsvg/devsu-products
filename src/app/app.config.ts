import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { DatePipe } from '@angular/common';
import { FilterProductsPipe } from './components/products/pipes/filter-products.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([HttpClientModule]),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    DatePipe,
    FilterProductsPipe
  ],
};
