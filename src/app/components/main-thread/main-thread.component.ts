import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkerCommunicationService} from '../../services/worker-communication.service';
import {DataModel} from '../../models/data.model';

@Component({
  selector: 'app-main-thread',
  templateUrl: './main-thread.component.html',
  styleUrls: ['./main-thread.component.css'],
})
export class MainThreadComponent implements OnInit, OnDestroy {
  data: DataModel[] = [];
  timerInterval: number = 1000;
  dataArraySize: number = 100;
  additionalIds: string[] = [];
  additionalIdsString: string = '';
  timer: any;

  constructor(private workerService: WorkerCommunicationService) {
  }

  ngOnInit(): void {
    this.startPseudoSocket();

    this.workerService.dataUpdate.subscribe((updatedData: DataModel[]) => {
      this.data = this.getLast10Elements(updatedData);
    });
  }

  ngOnDestroy(): void {
    this.stopPseudoSocket();
  }

  public updatePseudoSocket(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.stopPseudoSocket();
      this.additionalIds = this.additionalIdsString.split(',').map((id) => id.trim());
      this.startPseudoSocket();
    }, 500);
  }

  private startPseudoSocket(): void {
    this.workerService.startPseudoSocket(this.timerInterval, this.dataArraySize, [...this.additionalIds]);
  }

  private stopPseudoSocket(): void {
    this.workerService.stopPseudoSocket();
  }

  private getLast10Elements(updatedData: DataModel[]): DataModel[] {
    const startIndex = Math.max(0, updatedData.length - 10);
    return updatedData.slice(startIndex);
  }
}
