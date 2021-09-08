import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() endpoint: number;
  @Input() tableData: Object[];
  @Input() displayedColumns: string[];

  constructor() {}

  ngOnInit() {
    console.log(this.tableData, this.displayedColumns);
  }
}
