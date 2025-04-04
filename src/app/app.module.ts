import { APP_INITIALIZER, NgModule, isDevMode } from "@angular/core";
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserService } from "./services/user.service";
import { EMPTY } from "rxjs";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from "@angular/router";
import { routes } from "./app-routing.module";
import { AuthCookieUtils } from "./utils/authCookie.utils";
export function initAuth(authCookieUtils: AuthCookieUtils, userService: UserService) {
  let userId = authCookieUtils.getUserId();

  return ()  =>
  userId ? userService.auth() : EMPTY;
}

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            registrationStrategy: "registerWhenStable:30000",
        }),
        BrowserAnimationsModule], providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initAuth,
            deps: [AuthCookieUtils, UserService],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: "always" })),
        provideClientHydration(withHttpTransferCacheOptions({
            includePostRequests: true
        }))
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
