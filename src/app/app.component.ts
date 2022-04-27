
import { Component,  OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Data source will be provided eventually as input
  DUMMY_TABLE_DATA: any[]= [
    { a: 'Dummy1', b: 'Data String 1', c: 21, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy2', b: 'Data String 2', c: 22, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy3', b: 'Data String 3', c: 23, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy4', b: 'Data String 4', c: 24, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy5', b: 'Data String 5', c: 25, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy6', b: 'Data String 6', c: 26, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy7', b: 'Data String 7', c: 27, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy8', b: 'Data String 8', c: 28, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy9', b: 'Data String 9', c: 29, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy10', b: 'Data String 10', c: 30, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy11', b: 'Data String 11', c: 31, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy12', b: 'Data String 12', c: 32, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy13', b: 'Data String 13', c: 33, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy14', b: 'Data String 14', c: 34, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy15', b: 'Data String 15', c: 35, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy16', b: 'Data String 16', c: 36, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy17', b: 'Data String 17', c: 37, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy18', b: 'Data String 18', c: 38, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy19', b: 'Data String 19', c: 39, d: 'Dummy', e: 'Dummier', f: 'Sample'},
    { a: 'Dummy20', b: 'Data String 20', c: 40, d: 'Dummy', e: 'Dummier', f: 'Sample'},
  ];
  
  config = {
    columns:  [
      {
        key: 'a',
        title: 'Column A',
        type: 'string',
        visible: true,
      },
      {
        key: 'b',
        title: 'Column B',
        type: 'string',
        visible: true,
      },
      {
        key: 'c',
        title: 'Column C',
        editable: true,
        type: 'number',
        visible: true,
      },
      {
        key: 'd',
        title: 'Column D',
        editable: true,
        type: 'string',
        visible: true,
      },
      {
        key: 'e',
        title: 'Column E',
        type: 'string',
        visible: true,
      },
      {
        key: 'f',
        title: 'Column F',
        type: 'string',
        visible: true,
      }
    ],
    defaultData: this.DUMMY_TABLE_DATA
  };


  availableColumns!: string[];
  visibleColumns!: string[];
  hiddenColumns!: string[];
  dataSource: any;
  selectOptions: any;
  dataColumns: any;
  updatedRowIndex = -1;

  columnsControl = new FormControl();


  constructor() { }
  
  ngOnInit(): void {
    this.setVisibleColumns(this.config.columns);
    this.availableColumns = this.visibleColumns;
    this.selectOptions = this.dataColumns = [...this.config.columns];
    this.dataSource = new MatTableDataSource<any>(this.config.defaultData);
    this.columnsControl.valueChanges.subscribe(change => {
      this.filterColumns(change);
      this.hiddenColumns = this.availableColumns.filter(column => !this.visibleColumns.includes(column))
    })
  }

  
  setVisibleColumns(columns: any[]){
    this.visibleColumns = [];
    let columnCount = columns.length;
    let columsToDisplay = [];
    for(let i = 0; i < columnCount; i++){
      let columnConfig = columns[i];
      
      if (columnConfig.visible) {
        columsToDisplay.push(columnConfig.key);
      }
    }

    this.visibleColumns = columsToDisplay;
  }

  filterColumns(columsId: any) {
    const tempColumns = this.config.columns.map(column => {
      if (columsId.includes(column.key)) {
        return {...column, visible: false}
      }

      return column;
    });

    this.setVisibleColumns(tempColumns);
  }

  resetItemFilter(key: string) {
    const newOptions = this.columnsControl.value.filter((option: string) => {
      return option != key
    })
    this.columnsControl.setValue(newOptions);
  }
}