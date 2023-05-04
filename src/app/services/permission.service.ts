import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '../main/users/userTable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  path ="https://authenticationapi20230501133914.azurewebsites.net/api/Permission";

  constructor(private http:HttpClient) { }

  getPermissions():Observable<Permission>{
    return this.http.get<Permission>(this.path)
  }
}
