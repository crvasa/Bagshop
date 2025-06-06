import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User> = this.userSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Prova Sito ${user.name}`, `Login Successful`);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to the Bagmine ${user.name}`, 'Register Successful');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    );
  }

  logout(): void {
    this.userSubject.next(new User());
    if (this.isBrowser) {
      localStorage.removeItem(USER_KEY);
      window.location.reload(); // Solo lato client
    }
  }

  private setUserToLocalStorage(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    if (!this.isBrowser) return new User();
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : new User();
  }
}
