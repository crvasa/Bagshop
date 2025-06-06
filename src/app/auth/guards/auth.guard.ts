import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const isAuthenticated = !!this.userService.currentUser?.token;

    if (isAuthenticated) {
      return of(true); // ✅ Wrappa true in Observable
    } else {
      const redirect = this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return of(redirect); // ✅ Torna UrlTree come Observable
    }
  }
}
