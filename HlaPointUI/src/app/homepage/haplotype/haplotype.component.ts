import { Component, OnInit } from '@angular/core';
import { AppState } from '../../models/app-state';
import { Store } from '@ngrx/store';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent, SelectableSettings, RowArgs, AddEvent, EditEvent,

} from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import * as HaplotypeAction from '../homepage.actions/haplotype.action';
import * as GridConfigAction from '../homepage.actions/gridconfig.action';
import { Observable } from 'rxjs/Observable';
import { Haplotype } from './haplotype';
import { Router } from '@angular/router';
import { Gridcolumnconfig } from '../../models/gridcolumnconfig';
import { DialogModule } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-haplotype',
  templateUrl: './haplotype.component.html',
  styleUrls: ['./haplotype.component.css']
})
export class HaplotypeComponent implements OnInit {

  public haplotypedet$ = new Observable<any>();
  public gridData: any;
  public Exceldata: any;
  public spinnervisibility = true;
  private addNewhap = 'ADD';
  private updatehap = 'UPDATE';
  /***Change for Grid Configuration */
  private gridname = 'HAPLOTYPE';
  public intialgridstate: Gridcolumnconfig[];
  public configuredgridstate: Gridcolumnconfig[];
  public dialogOpened = false;
  public gridcolumnchanged = false;
  public gridconfig$ = new Observable<any>();
  public gridstate: Gridcolumnconfig[];
  public pagesize: Array<number> = [];
  /** */
  public state: State = {
    skip: 0,
    take: 100,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'createdbyuser', operator: 'contains', value: 'gpearson' }]
    }
  };
  constructor(private store: Store<AppState>, private router: Router) {
    this.pagesize = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  }


  ngOnInit() {
    this.spinnervisibility = true;
    this.GridColumnsInit()
    this.configuredgridstate = this.intialgridstate;
    this.loadGrid();
    this.gridconfig$ = this.store.select(state => state.GridColumnDet);
    this.gridconfig$.subscribe(data => {
      if (typeof data != 'undefined') {

        const configdet = data.filter(g => g.gridname == this.gridname);
        this.gridstate = data.filter(g => g.gridname != this.gridname);


        if ((configdet.length != 0) && (typeof configdet.length != 'undefined')) {
          this.configuredgridstate = configdet;
          this.gridcolumnchanged = true;
        }
      }
    })

  }


  loadGrid() {

    this.store.dispatch(new HaplotypeAction.LoadHaplotype());
    this.haplotypedet$ = this.store.select(state => state.Haplotypelist.haplotypedata);
    this.haplotypedet$.subscribe(data => {
      if (typeof data != 'undefined') {
        this.gridData = process(data, this.state);
        this.Exceldata = process(data, this.state).data;
        if (process(data, this.state).data.length > 0) {
          this.spinnervisibility = false;
        }
      }
    });
  }

  dataStateChange(newstate: DataStateChangeEvent) {

    this.state = newstate;
    this.haplotypedet$.subscribe(data => {
      this.gridData = process(data, this.state);
      this.Exceldata = process(data, this.state).data;
    });
  }


  editClick({ dataItem, rowIndex }: any): void {

    this.router.navigate(['Home/UpdateHaplotype', this.updatehap, dataItem.Id]);

  }


  Addnew() {

    this.router.navigate(['Home/UpdateHaplotype', this.addNewhap, 0]);

  }

  gridFilter(event) {

    let srchText = (event);

    if (srchText != null) {
      srchText = srchText.toLowerCase();
    }

    if (event.length != 0) {


      this.haplotypedet$.subscribe(data => {
        this.gridData = process(data.filter(data => (data.Haplotype.toLowerCase()
          + data.LinkageDisEquilibrium + data.Name + data.Description + data.CreatedDateTime
          + data.LastModifiedDateTime + data.createdbyuser + data.UserName + data.isDeleted
        ).includes(event.toLowerCase())), this.state);

        this.Exceldata = process(data.filter(data => (data.Haplotype.toLowerCase()
          + data.LinkageDisEquilibrium + data.Name + data.Description + data.CreatedDateTime
          + data.LastModifiedDateTime + data.createdbyuser + data.UserName + data.isDeleted
        ).includes(event.toLowerCase())), this.state).data;
      });


    }
    else {

      this.haplotypedet$.subscribe(data => {
        this.gridData = process(data, this.state);
        this.Exceldata = process(data, this.state).data;
      });
    }



  }

  GridColumnsInit() {

    this.intialgridstate = [
      {
        gridname: this.gridname,
        fieldname: 'Haplotype',
        titlename: 'Haplotype',
        width: '500',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },

      {
        gridname: this.gridname,
        fieldname: 'Count',
        titlename: 'Count',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'numeric',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },

      {
        gridname: this.gridname,
        fieldname: 'Frequency',
        titlename: 'Frequency',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'numeric',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'LinkageDisEquilibrium',
        titlename: 'Linkage Disequilibrium',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'numeric',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'populationName',
        titlename: 'Population Name',
        width: '300',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'CreatedDateTime',
        titlename: 'Created Date Time',
        width: '200',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: true,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'LastModifiedDateTime',
        titlename: 'Last Modified Date Time',
        width: '200',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: true,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'LastModifiedByUser',
        titlename: 'Last Modified User',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: 'userName',
        childColumnType: 'string',
        tableName: 'HaplotypeFrequencies'
      },
      {
        gridname: this.gridname,
        fieldname: 'createdbyuser',
        titlename: 'Created by User',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: 'UserName',
        childColumnType: 'string',
        tableName: 'Users'
      },
      {
        gridname: this.gridname,
        fieldname: 'IsDeleted',
        titlename: 'Is Deleted',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'boolean',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'HaplotypeFrequencies'
      },
    ]

  }

  GridColumnSetting() {
    this.dialogOpened = true;
  }
  closeDialog() {
    this.dialogOpened = false;
  }
  setgridcolumn(event) {

    if (event.length != 0) {
      this.configuredgridstate = event;
    }

    if ((this.gridstate.length != 0) && (typeof this.gridstate.length != 'undefined')) {

      this.gridstate = this.gridstate.concat(this.configuredgridstate);
      this.store.dispatch(new GridConfigAction.SetGridColumns(this.gridstate));
    }
    else {
      this.store.dispatch(new GridConfigAction.SetGridColumns(this.configuredgridstate));
    }
    this.dialogOpened = false;
  }


  columnresize(event) {
    var obj = event
    let griddet = this.configuredgridstate.filter(g => g.gridname == this.gridname && g.fieldname == obj[0].column.field);
    griddet[0].width = obj[0].newWidth;
    this.store.dispatch(new GridConfigAction.SetGridColumns(this.configuredgridstate));
    this.store.dispatch(new GridConfigAction.SetGridColumnsWidth(griddet));
  }

}
