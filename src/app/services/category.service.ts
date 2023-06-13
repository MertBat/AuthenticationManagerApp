import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryList } from '../main/products/productList';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path =  "https://localhost:5001/api/category"
  constructor(private http:HttpClient) { }

  getCategory():Observable<any>{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get<CategoryList[]>(this.path, options)
  }

}
