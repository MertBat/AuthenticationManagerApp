import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';
import { ProductList } from '../productList';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  productListBook: ProductList[] = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit() {
    this.productListService.getProductList().subscribe((data: any) => {
      this.productListBook = data.filter((d: ProductList) => {
        return d.category == 'book';
      });
    });
  }
}
