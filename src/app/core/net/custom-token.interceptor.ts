import { Injectable, Injector } from '@angular/core';
import { BaseInterceptor, DelonAuthConfig } from '@delon/auth';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Injectable()
export class CustomTokenInterceptor extends BaseInterceptor {
  constructor(injector: Injector) {
    super(injector);
  }
  isAuth(options: DelonAuthConfig): boolean {
    return true;
  }

  setReq(req: HttpRequest<any>, options: DelonAuthConfig): HttpRequest<any> {
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.injector.get(DA_SERVICE_TOKEN).get().token;

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
