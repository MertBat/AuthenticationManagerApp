import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../login/account';

@Injectable()
export class AccountService {
  path = 'https://authenticationapi20230501133914.azurewebsites.net/api/';
  getAccount: any;
  constructor(private http: HttpClient) {}
  permision!: boolean;

  signIn(data: Account): Observable<any> {
    return this.http.post(this.path + 'Account/signin', {
      userName: data.name,
      password: data.password,
    });
  }

  signUp(data: any): Observable<any> {
    return this.http.post(this.path + 'Account/signup', {
      username: data.name,
      password: data.password,
      password1: data.password1,
    });
  }

  getAccounts(id?: number): Observable<any> {
    let newPath = this.path + 'User';
    if (id) {
      newPath = newPath + '/' + id;
    }
    return this.http.get<Account[]>(newPath);
  }

  postAccount(data: any): Observable<Account> {
    return this.http.post<Account>(this.path + 'User', data);
  }

  putAccount(data: any, id: number): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'Token',
    //   }),
    // };
    const newPath = this.path + 'User/' + id;
    return this.http.put(newPath, data);
  }

  deleteAccount(id: number): Observable<any> {
    const newpath = this.path + 'User/' + id;
    return this.http.delete(newpath);
  }

  getPermissionToControlPanel() {
    const permision = JSON.parse(localStorage.getItem('account')!);
    if (permision.authority !== 'user') {
      return true;
    } else {
      return false;
    }
  }

  getLoginPermission() {
    const permission = sessionStorage.getItem('account');
    if (permission) {
      return true;
    } else {
      return false;
    }
  }

  getAccountPermissions() {
    return JSON.parse(localStorage.getItem('permissions')!);
  }

  avalibleAccount() {
    return JSON.parse(localStorage.getItem('account')!);
  }
}
