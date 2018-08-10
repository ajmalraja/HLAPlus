import { TestBed, inject } from '@angular/core/testing';

import { SystemloggingService } from './systemlogging.service';

describe('SystemloggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemloggingService]
    });
  });

  it('should be created', inject([SystemloggingService], (service: SystemloggingService) => {
    expect(service).toBeTruthy();
  }));
});
