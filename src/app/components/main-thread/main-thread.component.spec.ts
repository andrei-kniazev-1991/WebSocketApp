import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MainThreadComponent} from './main-thread.component';
import {WorkerCommunicationService} from '../../services/worker-communication.service';
import {DataModel} from '../../models/data.model';
import {LastTenElementsComponent} from "../last-ten-elements/last-ten-elements.component";
import {Subject} from "rxjs";

describe('MainThreadComponent', () => {
  let component: MainThreadComponent;
  let fixture: ComponentFixture<MainThreadComponent>;
  let workerCommunicationServiceSpy: jasmine.SpyObj<WorkerCommunicationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WorkerCommunicationService', ['startPseudoSocket', 'stopPseudoSocket']);
    spy.dataUpdate = new Subject<DataModel[]>(); // Initialize dataUpdate as a Subject

    TestBed.configureTestingModule({
      declarations: [MainThreadComponent, LastTenElementsComponent],
      providers: [{provide: WorkerCommunicationService, useValue: spy}],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(MainThreadComponent);
    component = fixture.componentInstance;
    workerCommunicationServiceSpy = TestBed.inject(WorkerCommunicationService) as jasmine.SpyObj<WorkerCommunicationService>;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start pseudo-socket on init', () => {
    spyOn(component as any, 'startPseudoSocket');
    component.ngOnInit();
    expect(component['startPseudoSocket']).toHaveBeenCalled();
  });

  it('should stop pseudo-socket on destroy', () => {
    spyOn(component as any, 'stopPseudoSocket');
    component.ngOnDestroy();
    expect(component['stopPseudoSocket']).toHaveBeenCalled();
  });

  it('should update pseudo-socket on input change', fakeAsync(() => {
    spyOn(component as any, 'stopPseudoSocket');
    spyOn(component as any, 'startPseudoSocket');
    component.additionalIdsString = 'id1, id2, id3';
    component.updatePseudoSocket();
    tick(1000);
    expect(component['stopPseudoSocket']).toHaveBeenCalled();
    expect(component['startPseudoSocket']).toHaveBeenCalledWith();
  }));

  it('should correctly parse additionalIds on input change', fakeAsync(() => {
    component.additionalIdsString = 'id10, id20, id30';
    component.updatePseudoSocket();
    tick(1000);
    expect(component.additionalIds).toEqual(['id10', 'id20', 'id30']);
  }));

  it('should correctly get last 10 elements', () => {
    const testData: DataModel[] = Array.from({length: 20}, (_, i) => ({
      id: `id${i}`,
      int: 0,
      float: 0,
      color: '',
      child: {id: '', color: ''}
    }));
    const result = component['getLast10Elements'](testData);
    expect(result.length).toBe(10);
    expect(result[0].id).toBe('id10');
    expect(result[9].id).toBe('id19');
  });

  it('should start pseudo-socket with the correct arguments', () => {
    component.timerInterval = 500;
    component.dataArraySize = 50;
    component.additionalIds = ['id1', 'id2'];
    component['startPseudoSocket']();
    expect(workerCommunicationServiceSpy.startPseudoSocket).toHaveBeenCalledWith(500, 50, ['id1', 'id2']);
  });

  it('should stop pseudo-socket', () => {
    component['stopPseudoSocket']();
    expect(workerCommunicationServiceSpy.stopPseudoSocket).toHaveBeenCalled();
  });

});
