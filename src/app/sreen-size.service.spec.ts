import { TestBed } from '@angular/core/testing';

import { SreenSizeService } from './sreen-size.service';

describe('SreenSizeService', () => {
  let service: SreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
