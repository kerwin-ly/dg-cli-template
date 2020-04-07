import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from 'app/layout/passport/passport.component';
import { UserLoginComponent } from './passport/pages/login/login.component';

const routes: Routes = [
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [{ path: 'login', component: UserLoginComponent, data: { title: '登录页' } }]
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'user/list', pathMatch: 'full' },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { title: 'user' }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
