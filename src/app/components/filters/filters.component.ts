import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTableList, faTableCells  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  faTableList = faTableList;
  faTableCells = faTableCells;

  gridList = true;

  @Input() totalProducts = 10;

  @Output() changeTypeList = new EventEmitter<boolean>();


  onChangeTypeList(value: boolean): void {
    this.gridList = value;
    this.changeTypeList.emit(this.gridList);
  }
}
