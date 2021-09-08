import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-filter-form',
  templateUrl: './dynamic-filter-form.component.html',
  styleUrls: ['./dynamic-filter-form.component.css'],
})
export class DynamicFilterFormComponent implements OnInit {
  @Input() filterArr: any;
  @Input() endpoint: number;
  @Output() dataSourceEvent = new EventEmitter<Object[]>();
  tableResponseArr: Object[];
  myFormGroup: FormGroup;

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log(this.myFormGroup.value);
    this.http
      .post(
        `http://localhost:5000/vortexa/${this.endpoint}`,
        this.myFormGroup.value,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          this.tableResponseArr = JSON.parse(response);
          console.log(this.tableResponseArr);
          this.passToParent(this.tableResponseArr);
        },
        (error) => console.log(error)
      );
  }

  passToParent(value: Object[]) {
    console.log('Sent to filters');
    this.dataSourceEvent.emit(value);
  }

  ngOnInit(): void {
    let group = {};
    console.log(this.filterArr);
    this.filterArr.forEach((filter) => {
      group[filter.label] = new FormControl('');
    });
    this.myFormGroup = new FormGroup(group);
  }
}