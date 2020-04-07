import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCenterComponent } from './pages/user-center/user-center.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'center',
    pathMatch: 'full'
  },
  {
    path: 'center',
    component: UserCenterComponent,
    data: {
      title: '用户中心'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
