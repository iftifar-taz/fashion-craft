import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private selectedProduct = new BehaviorSubject<Product>({
    url: '/assets/images/sample-product.jpg',
    width: 1300,
    height: 1300
  });
  selectedProduct$ = this.selectedProduct.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/jsons/products.json');
  }

  updateSelectedProduct(product: Product): void {
    this.selectedProduct.next(product);
  }
}
