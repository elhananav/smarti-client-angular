import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  prodForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _prodService: ProductService,
    private _dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.prodForm = this._fb.group({
      name: '',
      type: '',
      description: '',
      price: '',
    });
  }

  ngOnInit(): void {
    this.prodForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.prodForm.valid) {
      if(this.data) {
        this._prodService.updateProduct(this.data.id, this.prodForm.value)
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      } else {
        this._prodService.addProduct(this.prodForm.value)
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }

    }
  }
}
