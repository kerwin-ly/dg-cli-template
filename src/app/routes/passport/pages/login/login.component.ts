import { Inject } from '@angular/core';
import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '@shared/api';
import { UserInfo, CommonResponse } from '@shared/interfaces';
import { PermissionService } from '@shared/utils';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class UserLoginComponent {
  form: FormGroup;
  error: string;
  type = 0;
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    @Optional()
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private translateService: TranslateService,
    private apiUserService: ApiUserService,
    private permissionService: PermissionService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
    this.modalSrv.closeAll();
  }

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  submit(): void {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    }
    if (this.type === 0) {
      this.loading = true;
      // 清空路由复用信息
      this.apiUserService
        .login({ account: this.userName.value, password: this.password.value, globalLoading: false })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          (res: CommonResponse<UserInfo>) => {
            this.tokenService.set({
              id: res.data.id,
              name: res.data.name,
              token: res.data.token,
              permissions: res.data.permissions,
              avatar: './assets/img/default-user.png'
            });
            this.permissionService.set(res.data.permissions);
            this.router.navigate(['/']);
          },
          err => {
            this.error = this.translateService.instant(`账户或密码错误`);
          }
        );
    }
  }
}
