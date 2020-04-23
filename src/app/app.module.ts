import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OverlayModule } from '@angular/cdk/overlay';
import { default as ngLang } from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
const LANG = {
	abbr: 'zh',
	ng: ngLang,
	zorro: zorroLang,
	delon: delonLang
};
import { registerLocaleData } from '@angular/common';
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
	{ provide: LOCALE_ID, useValue: LANG.abbr },
	{ provide: NZ_I18N, useValue: LANG.zorro },
	{ provide: DELON_LOCALE, useValue: LANG.delon }
];

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

const FORM_MODULES = [];

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomTokenInterceptor } from '@core/net/custom-token.interceptor';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { ResponseCodeInterceptor } from '@core/net/response-code.interceptor';

const INTERCEPTOR_PROVIDES = [
	{ provide: HTTP_INTERCEPTORS, useClass: CustomTokenInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ResponseCodeInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];

const GLOBAL_THIRD_MODULES = [];

import { StartupService } from '@core/startup/startup.service';
export function StartupServiceFactory(startupService: StartupService): Function {
	return () => startupService.load();
}
const APPINIT_PROVIDES = [
	StartupService,
	{
		provide: APP_INITIALIZER,
		useFactory: StartupServiceFactory,
		deps: [StartupService],
		multi: true
	}
];

import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		DelonModule.forRoot(),
		CoreModule,
		OverlayModule,
		SharedModule,
		LayoutModule,
		RoutesModule,
		// i18n
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		...FORM_MODULES,
		...GLOBAL_THIRD_MODULES
	],
	providers: [...LANG_PROVIDES, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES],
	bootstrap: [AppComponent]
})
export class AppModule {}
