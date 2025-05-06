import { TestBed } from '@angular/core/testing';

import { SvgIconRegistryService } from './svg-icon-registry.service';

describe('SvgIconRegistryService', () => {
  let service: SvgIconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgIconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
