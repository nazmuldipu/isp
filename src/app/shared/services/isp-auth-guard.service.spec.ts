import { TestBed, inject } from '@angular/core/testing';

import { IspAuthGuard } from './isp-auth-guard.service';

describe('IspAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IspAuthGuard]
    });
  });

  it('should be created', inject([IspAuthGuard], (service: IspAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
