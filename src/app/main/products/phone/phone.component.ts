import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';
import { ProductList } from '../productList';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  productListPhone: ProductList[] = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit() {
    this.productListService.getProductList().subscribe((data: any) => {
      this.productListPhone = data.filter((d: ProductList) => {
        return d.category == 'phone';
      });
    });
  }

  flipTheCard(productName:string, id:number){
    const flipcardId =productName +id
    const flipcard = document.getElementById(flipcardId);
    flipcard?.classList.toggle('flipped')
  }
}
