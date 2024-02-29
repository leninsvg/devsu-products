import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    headers: new HttpHeaders({authorId: environment.authorId})
  })
  return next(req);
};
