import { TestBed } from '@angular/core/testing';

import { EstimatorService } from './estimator.service';

describe('EstimatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstimatorService = TestBed.get(EstimatorService);
    expect(service).toBeTruthy();
  });
});
