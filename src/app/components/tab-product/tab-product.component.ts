import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: '.app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.css']
})
export class TabProductComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  onClick(product: Product) {
    this.productService.updateSelectedProduct(product);
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((x: Product[]) => {
      this.products = x;
    });
  }
}
