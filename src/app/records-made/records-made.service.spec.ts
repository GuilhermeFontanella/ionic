import { TestBed } from '@angular/core/testing';

import { RecordsMadeService } from './records-made.service';

describe('RecordsMadeService', () => {
  let service: RecordsMadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsMadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
