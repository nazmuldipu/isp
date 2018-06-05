import { TestBed, inject } from '@angular/core/testing';

import { SmsApiService } from './sms-api.service';

describe('SmsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsApiService]
    });
  });

  it('should be created', inject([SmsApiService], (service: SmsApiService) => {
    expect(service).toBeTruthy();
  }));
});
