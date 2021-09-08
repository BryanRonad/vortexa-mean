import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { vessels, vesselMovements, cargo } from './filterVars';
import { Output, EventEmitter } from '@angular/core';

export interface FilterType {
  [id: number]: any;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  selectedFilter: string;
  filterElementsArr: Object[];
  filters: FormGroup;
  selected: number = -1;
  display: boolean = false;
  tableDataSource: Object[];
  @Input() endpoint: number;
  @Output() dataSourceEvent = new EventEmitter<Object[]>();

  filterObj: FilterType = {
    1: vessels,
    2: vesselMovements,
    3: cargo,
  };

  // getProp = (prop: any) => {
  //   let tempArr = [];
  //   if (this.filterObj[this.endpoint]) {
  //     for (let i = 0; i < this.selectedFilter.length; i++) {
  //       console.log(this.filterObj[this.endpoint][this.selectedFilter][prop]);
  //     }
  //     return tempArr;
  //   } else {
  //     return undefined;
  //   }
  // };

  addFilter = (propArr: string) => {
    // console.log(Array(propArr));
    this.display = !this.display;
  };

  createObjArr = (arr: any) => {
    let tempObj: any = this.filterObj[this.endpoint];
    let temp_obj_arr: any = [];
    arr.forEach((ele) => {
      tempObj[ele].label = ele;
      temp_obj_arr.push(tempObj[ele]);
    });
    return temp_obj_arr;
  };

  setDataSource(data: any) {
    console.log('Sent to app');
    this.dataSourceEvent.emit(data);
  }

  constructor() {}

  ngOnInit(): void {}
}
