import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'smarti-client-angular';

  searchTerm: any;
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'name', 
    'type',
    'price',
    'description', 
    'isInStock',
    'createdTime',
    'updatedTime',
    'action'
  ];

  constructor(private _dialog: MatDialog,
              private _prodService: ProductService,
              private _cdr: ChangeDetectorRef) {}
  

  ngOnInit(): void {
    this.getProducts();  
  }

  openForm() {
    const dialofRef = this._dialog.open(ProductComponent);
    dialofRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      }
    });
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.getProducts();
  }
  

  getProducts() {
    this._prodService.getProducts().subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  searchProducts(name: string) {
    this._prodService.searchProductsByName(name).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  deleteProduct(id: number) {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if(confirmation) {
      this._prodService.deleteProduct(id).subscribe({
        next: (res) => {
          this.getProducts();
        },
        error: console.log,
      })
    }
  }

  openEditForm(data: any) {
    const dialofRef = this._dialog.open(ProductComponent, {
      data,
    });
    dialofRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      }
    });

  }


}
