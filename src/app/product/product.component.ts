import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  prodForm: FormGroup;

  constructor(private _fb: FormBuilder,
     private _prodService: ProductService,
      private _dialogRef: DialogRef<ProductComponent>) {
    this.prodForm = this._fb.group({
      name: '',
      type: '',
      description: '',
      price: ''
    })
  }

  onFormSubmit() {
    if(this.prodForm.valid) {
      this._prodService.addProduct(this.prodForm.value).subscribe({
        next: (val: any) => {
          alert('prod add good');
          this._dialogRef.close();
;        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
