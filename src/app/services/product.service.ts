import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    return this._http.post('http://localhost:8000/api/product', data);
  }

  getProducts(): Observable<any> {

    return this._http.get('http://localhost:8000/api/product');
  }

  deleteProduct(id: number): Observable<any> {
    
    return this._http.delete(`http://localhost:8000/api/product/${id}`);
  }

  updateProduct(id: number, data: any): Observable<any> {
    
    return this._http.put(`http://localhost:8000/api/product/${id}`, data);
  }
}
