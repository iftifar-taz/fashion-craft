import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private selectedProduct = new BehaviorSubject<string>('/assets/images/sample-product.jpg');
  selectedProduct$ = this.selectedProduct.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<string[]> {
    return this.http.get<string[]>('/assets/jsons/products.json');
  }

  updateSelectedProduct(product: string): void {
    this.selectedProduct.next(product);
  }
}
