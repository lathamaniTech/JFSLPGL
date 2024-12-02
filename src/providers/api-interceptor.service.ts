import { GlobalService } from './global.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor(public global:GlobalService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //req is immutable so we have to clone.
    // const modifiedReq = req.clone({})

    req = req.clone({
      setHeaders: {
        'X-Frame-Options': 'DENY'
      }
    });

    // Add the Content-Security-Policy header
    req = req.clone({
      setHeaders: {
        'Content-Security-Policy': "default-src 'self'"
      }
    });

    // Add the Set-Cookie header
    req = req.clone({
      setHeaders: {
        'Set-Cookie': 'HttpOnly; Secure; SameSite=Strict'
      }
    });

    // Add the Strict-Transport-Security header
    req = req.clone({
      setHeaders: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    });

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response || HttpEventType.UploadProgress) {
          console.log(event.type,"interceptor");
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error,"errror showed")
        return throwError(error);
      }));
  }

}
