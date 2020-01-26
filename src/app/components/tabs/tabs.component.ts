import { Component, OnInit, Input } from '@angular/core';
import { TabInformation } from 'src/app/models/tab-information';

@Component({
  selector: '.app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs: TabInformation[];

  selectedTab: TabInformation;

  constructor() { }

  ngOnInit() {
  }

  tabOnClick(tab: TabInformation) {
    this.selectedTab = tab;
  }
}
