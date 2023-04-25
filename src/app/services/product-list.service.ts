import { Injectable } from '@angular/core';
import { ProductList } from '../main/products/productList';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Injectable()
export class ProductListService {
  path = "http://localhost:3000/productList";

  constructor(private http: HttpClient) { }

  getProductList(product?: string): Observable<ProductList> {
    let newPath
    if (product) {
      newPath = this.path + "?name=" + product;
    } else {
      newPath = this.path
    }
    return this.http.get<ProductList>(newPath);
  }

  postProductList(data: ProductList): Observable<ProductList> {
    return this.http.post<ProductList>(this.path, data);
  }

  putProductList(data: any, id: number): Observable<any> {
    const newPath = this.path + "/" + id;
    return this.http.put<ProductList>(newPath, data);
  }

  deleteProductList(id: number): Observable<any> {
    const newpath = this.path + "/" + id;
    return this.http.delete(newpath);
  }


}
