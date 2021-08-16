import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.User()
      .pipe(
        map(user => user !== null),
        tap(val => {
          if(!val){
            this.router.navigateByUrl("/login");
            return false;
          }
          else{
            return true;
          }
        })
      );
  }
  
}
