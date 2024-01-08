import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataModel} from "../models/data.model";

@Injectable({
  providedIn: 'root',
})
export class WorkerCommunicationService {
  private worker: Worker;
  dataUpdate: Subject<DataModel[]> = new Subject<DataModel[]>();

  constructor() {
    this.worker = new Worker(new URL('../pseudo-socket/pseudo-socket.worker', import.meta.url));
    this.worker.onmessage = (event) => {
      this.dataUpdate.next(event.data);
    };
  }

  startPseudoSocket(interval: number, dataSize: number, additionalIds: string[]): void {
    this.worker.postMessage({interval, dataSize, additionalIds});
  }

  stopPseudoSocket(): void {
    this.worker.postMessage({stop: true});
  }
}
