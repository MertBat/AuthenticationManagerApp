import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../login/account';

@Injectable()
export class AccountService {
  path = 'http://localhost:3000/account';
  getAccount: any;
  constructor(private http: HttpClient) { }
  permision!: boolean;

  getAccounts(input?: string): Observable<any> {
    let newpath;
    if (input) {
      newpath = this.path + '?name=' + input;
    } else {
      newpath = this.path;
    }
    return this.http.get<Account[]>(newpath);
  }

  postAccount(data: Account): Observable<Account> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.post<Account>(this.path, data, httpOptions);
  }

  putAccount(data: any, id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    const newPath = this.path + '/' + id;
    return this.http.put(newPath, data, httpOptions);
  }

  deleteAccount(id: number): Observable<any> {
    const newpath = this.path + "/" + id;
    return this.http.delete(newpath);
  }

  getPermissionToControlPanel() {
    const permision = JSON.parse(localStorage.getItem("account")!);
    if (permision.authority !== "user") {
      return true
    } else {
      return false
    }
  }

  getLoginPermission() {
    const permission = sessionStorage.getItem("account")
    if (permission) {
      return true;
    } else {
      return false
    }
  }

  getAccountPermissions(){
    return JSON.parse(localStorage.getItem("permissions")!);
  }

  avalibleAccount() {
    return JSON.parse(localStorage.getItem("account")!);
  }
}
