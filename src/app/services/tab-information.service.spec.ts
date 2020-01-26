import { TestBed } from '@angular/core/testing';

import { TabInformationService } from './tab-information.service';

describe('TabInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabInformationService = TestBed.get(TabInformationService);
    expect(service).toBeTruthy();
  });
});
