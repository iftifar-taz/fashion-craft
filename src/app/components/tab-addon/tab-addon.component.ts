import { Component, OnInit } from '@angular/core';
import { AddonService } from 'src/app/services/addon.service';
import { Addon } from 'src/app/models/addon';

@Component({
  selector: '.app-tab-addon',
  templateUrl: './tab-addon.component.html',
  styleUrls: ['./tab-addon.component.css']
})
export class TabAddonComponent implements OnInit {
  addons: Addon[];

  constructor(private addonService: AddonService) { }

  ngOnInit() {
    this.getAddonImages();
  }

  onClick(addon: Addon) {
    this.addonService.updateSelectedAddon(addon);
  }

  private getAddonImages(): void {
    this.addonService.getAddons().subscribe((x: Addon[]) => {
      this.addons = x;
    });
  }
}
