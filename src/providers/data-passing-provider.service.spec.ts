import { TestBed } from '@angular/core/testing';

import { DataPassingProviderService } from './data-passing-provider.service';

describe('DataPassingProviderService', () => {
  let service: DataPassingProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPassingProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
