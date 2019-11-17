import { TestBed } from '@angular/core/testing';

import { ProdiService } from './prodi.service';

describe('ProdiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdiService = TestBed.get(ProdiService);
    expect(service).toBeTruthy();
  });
});
