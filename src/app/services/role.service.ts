import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../main/users/userTable';


@Injectable({
  providedIn: 'root',
})
export class RoleService {
  path = 'https://authenticationapi20230501133914.azurewebsites.net/api/Role';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role> {
    return this.http.get<Role>(this.path);
  }

  postRole(data: Role): Observable<Role> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.post<Role>(this.path, data, httpOptions);
  }
  putRoles(data:Role, id:number):Observable<any>{
    const newPath = this.path + "/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.put(newPath,data,httpOptions);
  }

  deleteRole(id:number):Observable<any>{
    const newPath = this.path + "/" + id;
    return this.http.delete(newPath);
  }
}
