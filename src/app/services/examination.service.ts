import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../login/account';
import { AccountService } from './account.service';
import { Observable} from 'rxjs';
import { RoleService } from './role.service';
import { AlertifyService } from './alertify.service';

@Injectable()
export class ExaminationService {
  accounts!: any;
  singUpAccount: Account = new Account();
  newUser: Account = new Account();
  constructor(
    private accountService: AccountService,
    private alertifyService: AlertifyService,
    private router: Router,
    private roleService: RoleService
  ) {}

  signIn(formData: any): Observable<any> {
    return this.accountService.signIn(formData);
  }

  signUp(formData: any) {
    return this.accountService.signUp(formData).subscribe(
      (res) => {
        this.alertifyService.success('Your account created');
        this.router.navigateByUrl('/login');
      },
      (e) => {
        this.alertifyService.error('something went wrong');
      }
    );
  }

  passwordChange(passwords: any) {
    const accountName = this.accountService.avalibleAccount().name;
    if (passwords.newPassword1 == passwords.newPassword2) {
      this.accountService.getAccounts(accountName!).subscribe((data) => {
        if (passwords.password == data[0].password) {
          data[0].password = passwords.newPassword1;
          this.accountService
            .putAccount(data[0], data[0].id)
            .subscribe((data) => {
              this.alertifyService.success('Your password has been changed');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
        } else {
          this.alertifyService.error('Your password incorect');
        }
      });
    } else {
      this.alertifyService.error('Passwords are not maching');
    }
  }
  userInfoChange(userInfo: any, id: number) {
    this.accountService.getAccounts(id).subscribe((data) => {
      data.name = userInfo.name;
      data.surname = userInfo.surname;
      data.eMail = userInfo.eMail;
      data.url = userInfo.profileFoto;
      data.password = userInfo.password;
      this.accountService.putAccount(data, id).subscribe(
        () => {
          this.alertifyService.success(
            `Informations belongs to ${data.userName} successfuly changed`
          );
        },
        (e) => {
          this.alertifyService.error('Something went wrong');
        }
      );
    });
  }

  authorityChange(authority: string, id: number) {
    this.accountService.getAccounts(id).subscribe((data) => {
      data.authority = authority;
      this.accountService.putAccount(data, id).subscribe(
        () => {
          this.alertifyService.success('Role successfuly changed');
        },
        (e) => {
          this.alertifyService.error('Something went wrong');
        }
      );
    });
  }

  passwordCheck(passwordForConfirm: string) {
    const some = this.accountService.avalibleAccount().password;
    if (some == passwordForConfirm) {
      return true;
    } else {
      return false;
    }
  }
}
