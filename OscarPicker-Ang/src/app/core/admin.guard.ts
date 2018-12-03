import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
          this.auth.homeRedirect();
        }
      })
    );

  }
}
