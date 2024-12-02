import { TestBed } from '@angular/core/testing';

import { OnRoadPriceService } from './on-road-price.service';

describe('OnRoadPriceService', () => {
  let service: OnRoadPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnRoadPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
