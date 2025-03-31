import { inject, NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  UrlSegment,
} from "@angular/router";
import { UserService } from "./services/user.service";
import {QuicklinkStrategy, QuicklinkModule} from 'ngx-quicklink';
import { LayoutComponent } from "./layout/layout.component";
import { AuthGuard } from "./auth-guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then(
        (m) => m.LoginComponent
      ),
    canActivate: [
      () => !inject(UserService).userSignal(),
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./components/home/home.component").then((m) => m.HomeComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "users",
        loadComponent: () =>
          import("./components/user/user.component").then((m) => m.UserComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "users/create",
        loadComponent: () =>
          import("./components/user/create-user/create-user.component").then((m) => m.CreateUserComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "users/:username/update",
        loadComponent: () =>
          import("./components/user/update-user/update-user.component").then((m) => m.UpdateUserComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "tags",
        loadComponent: () =>
          import("./components/tag/tag.component").then((m) => m.TagComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "tags/create",
        loadComponent: () =>
          import("./components/tag/create-tag/create-tag.component").then((m) => m.CreateTagComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "tags/:id/update",
        loadComponent: () =>
          import("./components/tag/update-tag/update-tag.component").then((m) => m.UpdateTagComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "articles",
        loadComponent: () =>
          import("./components/article/article.component").then((m) => m.ArticleComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
      {
        path: "tests",
        loadComponent: () =>
          import("./components/test/test.component").then((m) => m.TestComponent),
        canActivate: [
          () => inject(AuthGuard).canActivate(),
        ],
      },
    ]
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      // PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
