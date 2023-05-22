import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from 'src/app/services/product-list.service';
import { AddChangeDialogComponent } from './add-change-dialog/add-change-dialog.component';
import { ProductList } from '../productList';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';

declare let alertify: any;

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
})
export class ProductSettingsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'category', 'price'];
  dataSource: any;
  tableData: any;
  selectedProductsId: number[] = [];
  some!: boolean;
  addProductPermission!: boolean;
  editProductPermission!: boolean;
  deleteProductPermission!: boolean;

  constructor(
    private productListService: ProductListService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService
  ) {}

  ngOnInit(): void {
    const accountPermissions =
      this.accountService.getAccountPermissions()[0].permissions;
    this.addProductPermission = accountPermissions.some(
      (p: any) => p == 'addProduct'
    );
    this.editProductPermission = accountPermissions.some(
      (p: any) => p == 'changeProduct'
    );
    this.deleteProductPermission = accountPermissions.some(
      (p: any) => p == 'removeProduct'
    );
    this.refresh();
  }

  refresh() {
    this.productListService.getProductList().subscribe((data) => {
      this.dataSource = data;
      this.tableData = new MatTableDataSource(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    if (this.editProductPermission) {
      const clickedRowData = this.dataSource.filter((d: any) => {
        return d.id == id;
      });
      const objectClickedRowData = clickedRowData[0];
      const dialogRef = this.dialog.open(AddChangeDialogComponent, {
        width: '550px',
        height: '900px',
        data: objectClickedRowData,
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          data.id = id;
          this.productListService.putProductList(data, id).subscribe(() => {
            this.refresh();
          });
        }
      });
    }
  }

  SelectProduct(id: number, e: any) {
    if (e.checked) {
      this.selectedProductsId.push(id);
    } else {
      const index = this.selectedProductsId.indexOf(id);
      if (index > -1) {
        this.selectedProductsId.splice(index, 1);
      }
    }
  }

  removeSelectedRows() {
    alertify.confirm("DELETE!!!",'Are you sure you want to delete selected rows?', () => {
      this.selectedProductsId.map((id: any) => {
        this.productListService.deleteProductList(id).subscribe(() => {
          this.refresh();
          this.alertifyService.success("Successfuly deleted")
        });
      });
    }, () => {
    });
  }
   

  addProduct() {
    const newProduct: ProductList = {
      id: 0,
      name: '',
      category: '',
      url: '',
      price: 0,
      description: '',
    };
    const dialogRef = this.dialog.open(AddChangeDialogComponent, {
      width: '550px',
      height: '900px',
      data: newProduct,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        data.id = 0;
        this.productListService.postProductList(data).subscribe(() => {
          this.refresh();
        });
      }
    });
  }
}
