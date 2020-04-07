import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { SpinService } from '@shared/utils';

interface RequestBody {
  globalLoading?: boolean;
  globalError?: boolean;
  [key: string]: any;
}

@Injectable()
export class ResponseCodeInterceptor implements HttpInterceptor {
  private extraParams = {
    globalLoading: true,
    globalError: true
  };
  constructor(private messageService: NzMessageService, private spinService: SpinService) {}

  intercept(req: HttpRequest<RequestBody>, next: HttpHandler) {
    // 如果不传参数，默认为true
    if (req.body) {
      this.extraParams = {
        globalLoading: !_.isUndefined(req.body.globalLoading) ? req.body.globalLoading : true,
        globalError: !_.isUndefined(req.body.globalError) ? req.body.globalError : true
      };
      this.filterParams<HttpRequest<RequestBody>>(req);
    }

    if (this.extraParams.globalLoading) {
      this.spinService.emit(true);
    }

    return next.handle(req).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status === 200) {
          if (event.body && event.body.code) {
            const { code, msg } = event.body;
            if (code && code !== 200) {
              return throwError(event.body);
            }
          }
        }
        return of(event);
      }),
      catchError(this.handleError(req))
    );
  }

  private filterParams<T>(req): void {
    const tempReq = req;
    if (!(tempReq.body instanceof FormData)) {
      for (const item of Object.keys(this.extraParams)) {
        delete tempReq.body[item];
      }
    }
  }

  private handleError<T>(req: HttpRequest<any>) {
    return (error): Observable<T> => {
      // 默认全局提示错误，如需局部处理，则在接口的error回调中处理
      if (this.extraParams.globalError) {
        this.messageService.error(error.msg);
      }

      return throwError(error);
    };
  }
}
