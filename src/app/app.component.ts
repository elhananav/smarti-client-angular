import { Component, OnInit } from '@angular/core';
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

  constructor(private _dialog: MatDialog, private _prodService: ProductService) {}
  

  ngOnInit(): void {
    this.getProducts();  
  }

  openAddEditProdForm() {
    this._dialog.open(ProductComponent)
  }

  getProducts() {
    this._prodService.getProducts().subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
    })
  }
}
