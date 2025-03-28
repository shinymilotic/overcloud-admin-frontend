import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { tap, shareReplay } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/auth/user.model";
import { AuthCookieUtils } from "../utils/authCookie.utils";
import { ApiError } from "../models/apierrors.model";
import { CreateUserRequest } from "../components/user/create-user/create-user-request.model";
import { UserList } from "../components/user/user-list.model";

@Injectable({ providedIn: "root" })
export class UserService {
  public userSignal = signal<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly authCookieUtils: AuthCookieUtils,
  ) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<User>("/users/login", credentials )
      .pipe(tap((data) => {
        this.userSignal.set(data);
        this.authCookieUtils.saveUserIdCookie(data.id);
      }));
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<void> {
    return this.http
      .post<void>("/users/register", credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>("/users/logout", {});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>("/users/current");
  }

  auth(): Observable<User> {
    return this.http.get<User>("/users/current").pipe(
      tap({
        next: (data) => {
          this.userSignal.set(data);
        },
        error: (errors: ApiError) => this.purgeAuth(),
      }),
      shareReplay(1)
    );
  }

  purgeAuth(): void {
    this.authCookieUtils.destroyUserIdCookie();
    this.userSignal.set(null);
  }

  refreshToken(): Observable<string> {
    return this.http
      .post<string>("/users/refresh-token", {});
  }

  confirmEmail(token: string) : Observable<void> {
    return this.http
      .post<void>(`/users/confirm-email`, {"confirmToken" : token});
    ;
  }

  getUsers(pageNumber?: number, itemsPerPage?: number) : Observable<UserList> {
    let params = new HttpParams();

    if (pageNumber != null && itemsPerPage != null) {
      params = params.set('pageNumber', pageNumber);
      params = params.set('itemsPerPage', itemsPerPage);  
    }
    
    return this.http
      .get<UserList>(`/users`, { params });
  }

  deleteUser(userId: string) : Observable<void> {
    return this.http
      .delete<void>(`/users/${userId}`);
  }

  createUser(user: CreateUserRequest): Observable<void>  {
    return this.http.post<void>(`/users`, user);
  }
}
