import { TestBed } from '@angular/core/testing';

import { StoreReadyService } from './store-ready.service';

describe('StoreReadyService', () => {
  let service: StoreReadyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreReadyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
