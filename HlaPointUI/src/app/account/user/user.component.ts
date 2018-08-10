import { Component, OnInit } from '@angular/core';
import { AppState } from '../../models/app-state';
import {Store} from '@ngrx/store';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent, SelectableSettings, RowArgs, AddEvent, EditEvent,

} from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import * as UserAction from '../login.actions/user.actions';
import * as GridConfigAction from '../../homepage/homepage.actions/gridconfig.action';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Gridcolumnconfig } from '../../models/gridcolumnconfig';
import { DialogModule } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userdet$= new Observable<any>();
  public gridData: any;
  public  Exceldata:any;
  public spinnervisibility:boolean;
  public pagesize:Array<number>=[];
    /***Change for Grid Configuration */
    private gridname='USER';
    public intialgridstate:Gridcolumnconfig[];
    public configuredgridstate:Gridcolumnconfig[];
    public dialogOpened=false;
    public gridcolumnchanged=false;
    public gridconfig$=new Observable<any>();
    /** */
  public state: State = {
    skip: 0,
    take: 100,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: []
  }
};

constructor(private store: Store<AppState>) {
  this.pagesize=[10,50,100,200,300,400,500,600,700,800,900,1000];
}


  ngOnInit() {
    this.spinnervisibility = true;
    this.GridColumnsInit()
    this.configuredgridstate=this.intialgridstate;
    this.loadGrid();
    this.gridconfig$=this.store.select(state=>state.GridColumnDet);
    this.gridconfig$.subscribe(data => {
      if (typeof data !='undefined') {

            const configdet = data.filter(g => g.gridname==this.gridname);


            if ((configdet.length!= 0) && (typeof configdet.length != 'undefined'))
            {
              this.configuredgridstate = configdet;
              this.gridcolumnchanged=true;
            }
      }
    })


  }


loadGrid() {

          this.store.dispatch(new UserAction.LoadUserList());
          this.userdet$  = this.store.select(state => state.UserList);
        this.userdet$.subscribe( data =>
          {
                this.gridData=process(data,this.state);
                this.Exceldata = process(data, this.state).data;

          });
  }

dataStateChange(newstate: DataStateChangeEvent) {

    this.state = newstate;
    this.userdet$.subscribe( data =>
      {
            this.gridData=process(data,this.state);
            this.Exceldata = process(data, this.state).data;
      });
}


editClick($event) {
}


gridFilter(event) {

      let srchText = (event);

      if (srchText != null) {
          srchText = srchText.toLowerCase();
      }

      if (event.length != 0) {


          this.userdet$.subscribe( data =>
            {
                  this.gridData = process(data.filter(data => (data.Haplotype.toLowerCase()
                  + data.LinkageDisEquilibrium+data.UserOnline+data.IsLocked
                  ).includes(event.toLowerCase() )), this.state)

                  this.Exceldata = process(data.filter(data => (data.Haplotype.toLowerCase()
                  + data.LinkageDisEquilibrium+data.UserOnline+data.IsLocked
                  ).includes(event.toLowerCase() )), this.state).data;
            });


      }
      else {

        this.userdet$.subscribe( data =>
          {
                this.gridData=process(data,this.state);
                this.Exceldata = process(data, this.state).data;
          });
  }



}


GridColumnsInit()
{

    this.intialgridstate= [
    {
     gridname: this.gridname,
     fieldname: 'Name',
     titlename: 'Name',
      width:'500',
      hiddenstate: false,
      columnchanged:true,
      filterType:'',
      datefiled:false,
      childColumnName:'',
      childColumnType:'',
      tableName: 'Users'

    },

    {
     gridname: this.gridname,
      fieldname:'Email',
      titlename:'Email',
      width:'350',
      hiddenstate:false,
      columnchanged:true,
      filterType:'',
      datefiled:false,
      childColumnName:'',
      childColumnType:'',
      tableName: 'Users'
    },
    {
     gridname: this.gridname,
     fieldname: 'userisOnline',
     titlename: 'userisOnline',
     width: '50',
      hiddenstate:false,
      columnchanged:true,
      filterType:'boolean',
      datefiled:true,
      childColumnName:'',
      childColumnType:'',
      tableName: 'Users'
    },
    {
     gridname: this.gridname,
      fieldname:'Islocked',
      titlename:'Islocked',
      width:'50',
      hiddenstate:false,
      columnchanged:true,
      filterType:'boolean',
      datefiled:false,
      childColumnName:'',
      childColumnType:'',
      tableName: 'Users'
    },
  ]

}

GridColumnSetting()
{
  this.dialogOpened=true;
}
closeDialog()
{
  this.dialogOpened=false;
}
setgridcolumn(event)
{
  if (event.length !=0)
  {
    this.configuredgridstate=event;
  }
  this.store.dispatch(new GridConfigAction.SetGridColumns(this.configuredgridstate));
  this.dialogOpened=false;
}

columnresize(event)
{
  var obj=event
  let griddet=this.configuredgridstate.filter(g => g.gridname==this.gridname && g.fieldname==obj[0].column.field);
  griddet[0].width=obj[0].newWidth;
  this.store.dispatch(new GridConfigAction.SetGridColumns( this.configuredgridstate));
  this.store.dispatch(new GridConfigAction.SetGridColumnsWidth( griddet));
}

}
