import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { BoundingInformation } from 'src/app/models/bounding-information';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { AddonService } from 'src/app/services/addon.service';

@Component({
  selector: '.app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit, AfterViewInit {

  product: string;
  addons: string[] = [];
  viewerCoordinate: BoundingInformation;

  constructor(private e: ElementRef, private productService: ProductService, private addonService: AddonService) { }

  ngOnInit() {
    this.subscribeProduct();
    this.subscribeAddons();
  }

  ngAfterViewInit(): void {
    this.viewerCoordinate = this.e.nativeElement.getBoundingClientRect();
  }

  onDeleteAddon(addon: string): void {
    if (addon && this.addons.includes(addon)) {
      this.addons.splice(this.addons.indexOf(addon), 1);
    }
  }

  private subscribeAddons(): void {
    this.addonService.selectedAddon$.subscribe((x: string) => {
      if (x && !this.addons.includes(x)) {
        this.addons.push(x);
      }
    });
  }

  private subscribeProduct(): void {
    this.productService.selectedProduct$.subscribe((x: string) => {
      this.product = x;
      this.e.nativeElement.setAttribute('style', `background-image: url('${this.product}');`);
    });
  }
}
