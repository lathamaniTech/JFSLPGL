import { TestBed } from '@angular/core/testing';

import { SquliteSupportProviderService } from './squlite-support-provider.service';

describe('SquliteSupportProviderService', () => {
  let service: SquliteSupportProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquliteSupportProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
