import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../main/users/userTable';


@Injectable({
  providedIn: 'root',
})
export class RoleService {
  path = 'http://localhost:3000/roles';
  constructor(private http: HttpClient) {}

  getRoles(input?: string): Observable<Role> {
    let newPath;
    if (input) {
      newPath = this.path + '?role=' + input;
    } else {
      newPath = this.path;
    }
    return this.http.get<Role>(newPath);
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
