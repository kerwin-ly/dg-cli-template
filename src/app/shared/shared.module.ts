import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { SpinComponent } from './components/spin/spin.component';

// services
import { SpinService, DateTimeService, ValidateService } from './utils';

const THIRDMODULES = [NgZorroAntdModule, CountdownModule];
const PIPES = [];
const COMPONENTS = [SpinComponent];
const ENTRY_COMPONENTS = [];
const DIRECTIVES = [];
const SERVICES = [SpinService, DateTimeService, ValidateService];
// #endregion

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		AlainThemeModule.forChild(),
		DelonABCModule,
		DelonACLModule.forRoot(),
		DelonFormModule,
		// third libs
		...THIRDMODULES
	],
	declarations: [
		// your components
		...COMPONENTS,
		...DIRECTIVES,
		...PIPES
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		AlainThemeModule,
		DelonABCModule,
		DelonACLModule,
		DelonFormModule,
		// third libs
		...THIRDMODULES,
		// your components
		...COMPONENTS,
		...DIRECTIVES,
		...PIPES
	],
	providers: [...SERVICES],
	entryComponents: [ENTRY_COMPONENTS]
})
export class SharedModule {}
