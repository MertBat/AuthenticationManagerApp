import { TestBed } from '@angular/core/testing';

import { ControlpanelGuardService } from './controlpanel-guard.service';

describe('ControlpanelGuardService', () => {
  let service: ControlpanelGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlpanelGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
