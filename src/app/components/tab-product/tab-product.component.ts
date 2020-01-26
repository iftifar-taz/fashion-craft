import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: '.app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.css']
})
export class TabProductComponent implements OnInit {
  products: string[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  onClick(product: string) {
    this.productService.updateSelectedProduct(product);
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((x: string[]) => {
      this.products = x;
    });
  }
}
