import { Injectable } from '@angular/core';
import { ProductList } from '../main/products/productList';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProductListService {
  path = "https://localhost:5001/api/product";

  constructor(private http: HttpClient) { }

  getProductList(id?: number): Observable<ProductList> {
    let newPath
    if (id) {
      newPath = this.path + "/" + id;
    } else {
      newPath = this.path
    }
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }
    return this.http.get<ProductList>(newPath, options);
  }

  postProductList(data: ProductList): Observable<ProductList> {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }
    return this.http.post<ProductList>(this.path, data, options);
  }

  putProductList(data: any, id: number): Observable<any> {
    const newPath = this.path + "/" + id;
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }
    return this.http.put<ProductList>(newPath, data, options);
  }

  deleteProductList(id: number): Observable<any> {
    const newpath = this.path + "/" + id;
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }
    return this.http.delete(newpath, options);
  }


}
