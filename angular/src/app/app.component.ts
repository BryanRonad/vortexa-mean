import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  type: string;
}

export interface Tab {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tiles: Tile[] = [
    { text: 'Filters', cols: 1, rows: 1, color: 'lightblue', type: 'filters' },
    { text: 'Table', cols: 3, rows: 1, color: 'lightgreen', type: 'table' },
  ];

  tabs: Tab[] = [
    { id: 1, text: 'Vessels' },
    { id: 2, text: 'Vessel Movements' },
    { id: 3, text: 'Cargo' },
  ];

  tableDataSourceArr: Object[] = [];
  displayedColumns: string[] = [];

  setDataSource(data: any) {
    console.log('Received in app');
    this.tableDataSourceArr = data;
    console.log(this.tableDataSourceArr);
    this.displayedColumns = Object.keys(this.tableDataSourceArr[0]);
  }
}
