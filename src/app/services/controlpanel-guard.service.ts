import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class ControlpanelGuardService implements CanActivate {

  constructor(private accountService: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const permision = this.accountService.getPermissionToControlPanel()
    if (permision) {
      return true
    } else {
      return false
    }
  }
}
