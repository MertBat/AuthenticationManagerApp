import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryList } from '../main/products/productList';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path =  "https://authenticationapi20230501133914.azurewebsites.net/api/category"
  constructor(private http:HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get<CategoryList[]>(this.path)
  }

}
