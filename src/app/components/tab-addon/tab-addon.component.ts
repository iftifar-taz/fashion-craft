import { Component, OnInit } from '@angular/core';
import { AddonService } from 'src/app/services/addon.service';

@Component({
  selector: '.app-tab-addon',
  templateUrl: './tab-addon.component.html',
  styleUrls: ['./tab-addon.component.css']
})
export class TabAddonComponent implements OnInit {
  addons: string[];

  constructor(private addonService: AddonService) { }

  ngOnInit() {
    this.getAddonImages();
  }

  onClick(addon: string) {
    this.addonService.updateSelectedAddon(addon);
  }

  private getAddonImages(): void {
    this.addonService.getAddons().subscribe((x: string[]) => {
      this.addons = x;
    });
  }
}
