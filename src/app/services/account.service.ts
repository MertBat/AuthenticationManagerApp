import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Account } from '../login/account';
import { JwtService } from './jwt.service';
import { User } from '../main/users/userTable';

@Injectable()
export class AccountService {
  path = 'https://localhost:5001/api/';
  getAccount: any;
  constructor(private http: HttpClient, private jwtService: JwtService) {}
  permision!: boolean;

  signIn(data: Account): Observable<any> {
    const url = this.path + 'account/signin';
    const body = { userName: data.name, password: data.password };
    return this.http.post(url, body);
  }

  signUp(data: any): Observable<any> {
    debugger;
    return this.http.post(this.path + 'Account/signup', {
      username: data.name,
      password: data.password1,
      password1: data.password2,
    });
  }

  getAccounts(id?: number): Observable<any> {
    let newPath = this.path + 'User';
    console.log(id);
    if (typeof(id) == "number") {
      newPath = `${newPath}/${id}`;
    }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get<Account[]>(newPath, options);
  }

  postAccount(data: any): Observable<Account> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Account>(this.path + 'User', data, options);
  }

  putAccount(data: any, id: number): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'Token',
    //   }),
    // };
    const newPath = this.path + 'User/' + id;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.put(newPath, data, options);
  }

  deleteAccount(id: number): Observable<any> {
    const newpath = this.path + 'User/' + id;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.delete(newpath, options);
  }

  avalibleAccount() {
    const user = this.jwtService.decodeToken();
    return this.getAccounts(user.id);
  }
}
