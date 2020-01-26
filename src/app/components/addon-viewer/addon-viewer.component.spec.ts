import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonViewerComponent } from './addon-viewer.component';

describe('AddonViewerComponent', () => {
  let component: AddonViewerComponent;
  let fixture: ComponentFixture<AddonViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonViewerComponent);
    component = fixture.componentInstance;
    component.addon = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
