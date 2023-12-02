import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/models/product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'smarti-client-angular';


  products: Product[] = [];
  // dataSource!: MatTableDataSource<any>;
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
    console.log("in ngOnInit");
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

  getProducts() {
    this._prodService.getProducts().subscribe({
      next: (res: any) => {
        this.dataSource = res;
        // this.dataSource = new MatTableDataSource(res);
        // this.products = res; // Assuming res is an array of products
        console.log(this.dataSource.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    this._prodService.deleteProduct(id).subscribe({
      next: (res) => {
        this.getProducts();
      },
      error: console.log,
    })
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
