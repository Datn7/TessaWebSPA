import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this._toastr.error(error.error.message, error.error.statusCode);
            }
          }

          if (error.status === 401) {
            this._toastr.error(error.error.message, error.error.statusCode);
          }

          if (error.status === 404) {
            console.log('404zInterceptor');
            this._router.navigateByUrl('/not-found');
          }

          if (error.status === 500) {
            console.log('500zInterceptor');
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this._router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}
