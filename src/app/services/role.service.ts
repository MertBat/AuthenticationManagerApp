import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../main/users/userTable';


@Injectable({
  providedIn: 'root',
})
export class RoleService {
  path = 'https://localhost:5001/api/Role';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role> {
    return this.http.get<Role>(this.path);
  }

  postRole(data: Role): Observable<Role> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Role>(this.path, data,options);
  }
  putRoles(data:Role, id:number):Observable<any>{
    const newPath = this.path + "/" + id;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.put(newPath,data, options);
  }

  deleteRole(id:number):Observable<any>{
    const newPath = this.path + "/" + id;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.delete(newPath, options);
  }

  
}
