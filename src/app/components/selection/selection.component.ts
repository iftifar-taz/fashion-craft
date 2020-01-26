import { Component, OnInit } from '@angular/core';
import { TabInformation } from 'src/app/models/tab-information';
import { TabInformationService } from 'src/app/services/tab-information.service';

@Component({
  selector: '.app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  tabs: TabInformation[] = [];

  constructor(private tabInformationService: TabInformationService) { }

  ngOnInit() {
    this.getTabInformations();
  }

  private getTabInformations(): void {
    this.tabInformationService.getTabInformations().subscribe((x: TabInformation[]) => {
      this.tabs = x;
    });
  }
}
