import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../login/account';
import { AccountService } from './account.service';
import { RoleService } from './role.service';
import { AlertifyService } from './alertify.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class ExaminationService {
  accounts!: any;
  singUpAccount: Account = new Account();
  newUser: Account = new Account();

  constructor(
    private accountService: AccountService,
    private alertifyService: AlertifyService,
    private router: Router,
    private jwtService: JwtService,
    private roleService: RoleService
  ) {}

  signIn(formData: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.accountService.signIn(formData).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.jwtService.decodeToken();
          this.router.navigateByUrl('/main/home');
          resolve(false);
        },
        (e) => {
          this.alertifyService.error(e.error);
          reject(false);
        }
      );
    });
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

  logOut() {
    localStorage.removeItem('token');
  }

  passwordChange(passwords: any) {
    this.accountService.avalibleAccount().subscribe((res) => {
      if (passwords.newPassword1 == passwords.newPassword2) {
          if (passwords.password == res.password) {
            res.password = passwords.newPassword1;
            this.accountService
              .putAccount(res, res.id)
              .subscribe((data) => {
                this.alertifyService.success('Your password has been changed');
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              });
          } else {
            this.alertifyService.error('Your password incorect');
          }
      
      } else {
        this.alertifyService.error('Passwords are not maching');
      }
    });
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
    this.accountService.avalibleAccount().subscribe((data) => {
      if (data.password == passwordForConfirm) {
        return true;
      } else {
        return false;
      }
    });
  }

  getPermissionToControlPanel() {
    const permision = this.jwtService.decodeToken().role;
    if (permision !== 'user') {
      return true;
    } else {
      return false;
    }
  }

  getAccountPermissions() {
    const user = this.jwtService.decodeToken();
    return new Observable<any>((observer) => {
      this.roleService.getRoles().subscribe((datas: any) => {
        const permissions = datas.filter((data: any) => {
          return data.roleName == user.authority;
        });
        observer.next(permissions[0].permissions); 
        observer.complete(); 
      });
    });
  }

}
