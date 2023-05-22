import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';
import { ProductList } from '../productList';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss']
})
export class MouseComponent implements OnInit {
  productListMouse: ProductList[] = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit() {
    this.productListService.getProductList().subscribe((data: any) => {
      this.productListMouse = data.filter((d: ProductList) => {
        return d.category == 'mouse';
      });
    });
  }

  flipTheCard(productName:string, id:number){
    const flipcardId =productName +id
    const flipcard = document.getElementById(flipcardId);
    flipcard?.classList.toggle('flipped')
  }
}
