import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '../main/users/userTable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  path ="https://localhost:5001/api/Permission";

  constructor(private http:HttpClient) { }

  getPermissions():Observable<Permission>{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get<Permission>(this.path, options)
  }
}
