import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, TitleService, SettingsService } from '@delon/theme';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private titleService: TitleService,
    private settingService: SettingsService,
    private httpClient: HttpClient
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(this.httpClient.get('assets/app-data.json'))
      .pipe(
        catchError(([appData]) => {
          resolve(null);
          return [appData];
        })
      )
      .subscribe(
        ([appData]) => {
          // application data
          const res: any = appData;
          this.settingService.setApp(res.app);
          this.settingService.setUser(res.user);
          // 初始化菜单
          this.menuService.add(res.menu);
          // 设置页面标题的后缀
          this.titleService.suffix = res.app.name;
        },
        () => {},
        () => {
          resolve(null);
        }
      );
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      this.viaHttp(resolve, reject);
    });
  }
}
