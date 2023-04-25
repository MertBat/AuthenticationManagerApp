import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../login/account';
import { AccountService } from './account.service';
import { AletifyService } from './aletify.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Role, UserTable } from '../main/users/userTable';
import { RoleService } from './role.service';

@Injectable()
export class ExaminationService {
  accounts!: any;
  singUpAccount: Account = new Account();
  newUser: Account = new Account();
  constructor(
    private accountService: AccountService,
    private alertifyService: AletifyService,
    private router: Router,
    private roleService:RoleService
  ) { }

  signIn(formData: any): Observable<any> {
    return this.accountService.getAccounts(formData.name).pipe(
      map((data) => {
        this.accounts = data;
        if (
          this.accounts.length == 1 &&
          formData.password == this.accounts[0].password
        ) {
          this.router.navigateByUrl('/main/home');
          sessionStorage.setItem('account', 'active');
          localStorage.setItem('account', JSON.stringify(this.accounts[0]));
          this.roleService.getRoles(this.accounts[0].authority).subscribe(data=>{
            localStorage.setItem("permissions", JSON.stringify(data));
          })
          return true;
        } else {
          this.alertifyService.error('user name or password incorect');
          return false;
        }
      })
    );
  }

  signUp(formData: any) {
    if (formData.password1 == formData.password2) {
      this.accountService.getAccounts(formData.name).subscribe((data) => {
        this.accounts = data;
        if (this.accounts.length == 0) {
          this.singUpAccount.name = formData.name;
          this.singUpAccount.password = formData.password1;
          this.singUpAccount.authority = 'user';
          this.accountService
            .postAccount(this.singUpAccount)
            .subscribe((data) => {
              this.alertifyService.success('Your account created');
              this.router.navigateByUrl('/login');
            });
        } else {
          this.alertifyService.error('Username already exist');
        }
      });
    } else {
      this.alertifyService.error('passwords are not maching');
    }
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
  userInfoChange(userInfo: any, account:string) {
    this.accountService
      .getAccounts(account)
      .subscribe((data) => {
        data[0].userName = userInfo.userName;
        data[0].userSurname = userInfo.userSurname;
        data[0].eMail = userInfo.eMail;
        data[0].url = userInfo.profileFoto;
        data[0].password = userInfo.password;
        debugger;
        this.accountService.putAccount(data[0], data[0].id).subscribe((d) => {
          this.alertifyService.success(`Informations belongs to ${userInfo.accountName} successfuly changed`);
          debugger;
        });
      });
  }

  authorityChange(authority: string, name: string) {
      this.accountService.getAccounts(name).subscribe((data) => {
        data[0].authority = authority.toLowerCase();
        this.accountService.putAccount(data[0], data[0].id).subscribe((d) => {
          this.alertifyService.success('Role successfuly changed');
        });
      });
  }

  addUser(user: UserTable) {
    this.newUser.name = user.accountName;
    this.newUser.eMail = user.eMail;
    this.newUser.userName = user.userName;
    this.newUser.userSurname = user.userSurname;
    this.newUser.authority = user.role;
    this.newUser.password = user.password;
    return this.accountService.postAccount(this.newUser);
  }

  deleteUser(user: UserTable): Observable<any> {
    return this.accountService
      .getAccounts(user.accountName)
      .pipe(switchMap((data) => this.accountService.deleteAccount(data[0].id)));
  }

  passwordCheck(passwordForConfirm: string) {
    const some = this.accountService.avalibleAccount().password
    if (some == passwordForConfirm) {
      return true
    } else {
      debugger;
      return false

    }
  }

}
