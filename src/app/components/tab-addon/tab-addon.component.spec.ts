import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAddonComponent } from './tab-addon.component';

describe('TabAddonComponent', () => {
  let component: TabAddonComponent;
  let fixture: ComponentFixture<TabAddonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAddonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
