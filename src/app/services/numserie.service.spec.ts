import { TestBed } from '@angular/core/testing';

import { NumserieService } from './numserie.service';

describe('NumserieService', () => {
  let service: NumserieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumserieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
