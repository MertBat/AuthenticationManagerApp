import { Component, OnInit } from '@angular/core';
import { ProductList } from '../productList';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.scss'],
})
export class ShoeComponent implements OnInit {
  productListShoe: ProductList[] = [];
  constructor(private productListService: ProductListService) {}

  ngOnInit(): void {
    this.productListService.getProductList().subscribe((data: any) => {
      this.productListShoe = data.filter((d: ProductList) => {
        return d.category == 'shoe';
      });
    });
  }

  flipTheCard(productName:string, id:number){
    const flipcardId =productName +id
    const flipcard = document.getElementById(flipcardId);
    flipcard?.classList.toggle('flipped')
  }
}
