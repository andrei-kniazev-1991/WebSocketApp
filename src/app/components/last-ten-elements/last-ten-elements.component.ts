import { Component, Input } from '@angular/core';
import { DataModel } from '../../models/data.model';

@Component({
  selector: 'app-last-ten-elements',
  templateUrl: './last-ten-elements.component.html',
  styleUrls: ['./last-ten-elements.component.css'],
})
export class LastTenElementsComponent {
  @Input() data: DataModel[] = [];
}
