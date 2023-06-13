import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { ExaminationService } from './examination.service';

@Injectable()
export class ControlpanelGuardService implements CanActivate {

  constructor(private examinationService: ExaminationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const permision = this.examinationService.getPermissionToControlPanel()
    if (permision) {
      return true
    } else {
      return false
    }
  }
}
