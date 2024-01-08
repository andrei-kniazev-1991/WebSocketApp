import { TestBed } from '@angular/core/testing';
import { WorkerCommunicationService } from './worker-communication.service';
import { DataModel } from '../models/data.model';

class MockWorker {
  postMessage(data: any): void {}
}

export function workerFactory(): MockWorker {
  return new MockWorker();
}

describe('WorkerCommunicationService', () => {
  let service: WorkerCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkerCommunicationService,
        { provide: MockWorker, useFactory: workerFactory },
      ],
    });

    service = TestBed.inject(WorkerCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start and stop pseudo socket', () => {
    let spy = spyOn(service['worker'], 'postMessage');
    service.startPseudoSocket(1000, 100, ['id1', 'id2']);
    expect(spy).toHaveBeenCalledWith({ interval: 1000, dataSize: 100, additionalIds: ['id1', 'id2'] });

    service.stopPseudoSocket();
    expect(spy).toHaveBeenCalledWith({ stop: true });
  });

  it('should update data on worker message', (done) => {
    const testData: DataModel[] = [{ id: '1', int: 1, float: 1.0, color: 'red', child: { id: 'child', color: 'blue' } }];

    service.dataUpdate.subscribe((updatedData: DataModel[]) => {
      expect(updatedData).toEqual(testData);
      done();
    });

    // Simulate worker message
    service['worker']!.onmessage!({ data: testData } as MessageEvent);
  });
});
