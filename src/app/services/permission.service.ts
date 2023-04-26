import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '../main/users/userTable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  path ="http://localhost:3000/permissions";

  constructor(private http:HttpClient) { }

  getPermissions():Observable<Permission>{
    return this.http.get<Permission>(this.path)
  }
}
