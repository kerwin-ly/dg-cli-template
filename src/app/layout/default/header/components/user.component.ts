import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

interface UserInfo {
  id: number;
  name: string;
  permissions: number[];
  token: string;
}

@Component({
  selector: 'header-user',
  template: `
    <div
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="menuTpl"
      class="alain-default__nav-item d-flex align-items-center px-sm"
    >
      <nz-avatar [nzSrc]="userInfo.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ userInfo.name }}
    </div>
    <nz-dropdown-menu #menuTpl="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li nz-menu-item (click)="goPersonal()">
          <i nz-icon nzType="user" nzTheme="outline" class="mr-sm"></i>
          个人中心
        </li>
        <li nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent implements OnInit {
  userInfo: UserInfo;
  constructor(
    public msg: NzMessageService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {}

  ngOnInit() {
    this.userInfo = this.tokenService.get() as UserInfo;
  }

  goPersonal(): void {}

  logout(): void {
    this.tokenService.clear();
    this.router.navigateByUrl('passport/login');
  }
}
