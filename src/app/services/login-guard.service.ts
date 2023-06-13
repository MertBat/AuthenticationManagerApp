import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AlertifyService } from './alertify.service';
import { ExaminationService } from './examination.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private alertifyService: AlertifyService,private examinationService: ExaminationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage) {
      return true;
    } else {
      this.router.navigate(['login']);
      this.alertifyService.error('you can not access this page');
      return false;
    }
  }
}
