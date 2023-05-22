import { Injectable } from '@angular/core';
import { ProductList } from '../main/products/productList';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProductListService {
  path = "https://authenticationapi20230501133914.azurewebsites.net/api/product";

  constructor(private http: HttpClient) { }

  getProductList(id?: number): Observable<ProductList> {
    let newPath
    if (id) {
      newPath = this.path + "/" + id;
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
