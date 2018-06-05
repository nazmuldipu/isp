import { TestBed, inject } from '@angular/core/testing';

import { CustomerLedgerService } from './customer-ledger.service';

describe('CustomerLedgerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerLedgerService]
    });
  });

  it('should be created', inject([CustomerLedgerService], (service: CustomerLedgerService) => {
    expect(service).toBeTruthy();
  }));
});
