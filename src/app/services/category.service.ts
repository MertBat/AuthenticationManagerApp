import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryList } from '../main/products/productList';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path =  "http://localhost:3000/category"
  constructor(private http:HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get<CategoryList[]>(this.path)
  }

}
