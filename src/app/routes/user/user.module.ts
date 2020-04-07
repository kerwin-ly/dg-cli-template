import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCenterComponent } from './pages/user-center/user-center.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [UserCenterComponent],
  imports: [SharedModule, CommonModule, UserRoutingModule],
  entryComponents: []
})
export class UserModule {}
