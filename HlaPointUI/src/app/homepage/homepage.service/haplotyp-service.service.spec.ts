import { TestBed, inject } from '@angular/core/testing';

import { HaplotypServiceService } from './haplotyp-service.service';

describe('HaplotypServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HaplotypServiceService]
    });
  });

  it('should be created', inject([HaplotypServiceService], (service: HaplotypServiceService) => {
    expect(service).toBeTruthy();
  }));
});
