import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryList, ProductList } from '../../productList';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-change-dialog',
  templateUrl: './add-change-dialog.component.html',
  styleUrls: ['./add-change-dialog.component.scss'],
})
export class AddChangeDialogComponent implements OnInit {
  categories: CategoryList[] = [];
  selectedChategory!: string;
  productForm!: FormGroup;
  productData: any;
  flipped!: boolean
  
 
  constructor(
    public dialogRef: MatDialogRef<AddChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productFormCheck();
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  productFormCheck() {
    this.productForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      url: [this.data.url, Validators.required],
      price: [this.data.price, Validators.compose([Validators.required, Validators.min(0.1)]) ],
      category: [this.data.category, Validators.compose([Validators.required, Validators.maxLength(650)])],
      description: [this.data.description, Validators.required],
    });
  }

  
 

  saveProduct() {
    if (this.productForm.valid) {
      this.productData = Object.assign({}, this.productForm.value);
      this.dialogRef.close(this.productData)
    }
  }

  run(value: string) {
    console.log(value);
  }
}

