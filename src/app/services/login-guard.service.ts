import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AccountService } from './account.service';
import { AletifyService } from './aletify.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private alertifyService: AletifyService,private accountService: AccountService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const permission = this.accountService.getLoginPermission();
    if (permission) {
      return true;
    } else {
      this.router.navigate(['login']);
      this.alertifyService.error('you can not access this page');
      return false;
    }
  }
}