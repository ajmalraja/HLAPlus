import { TestBed, inject } from '@angular/core/testing';

import { UserprefService } from './userpref.service';

describe('UserprefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserprefService]
    });
  });

  it('should be created', inject([UserprefService], (service: UserprefService) => {
    expect(service).toBeTruthy();
  }));
});
