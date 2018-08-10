import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../models/app-state';
import { Store } from '@ngrx/store';
import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent, SelectableSettings, RowArgs, AddEvent, EditEvent
} from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import * as PopulationAction from '../homepage.actions/population.action';
import * as GridConfigAction from '../homepage.actions/gridconfig.action';
import * as AdvanceSearchAction from '../homepage.actions/advancesearch.action';
import * as HomepageActions from '../homepage.actions/homepage.action';
import { Observable } from 'rxjs/Observable';
import { Populationdet } from './populationdet';
import { Gridcolumnconfig } from '../../models/gridcolumnconfig';
import { AdvanceSearch } from '../../models/advancesearch';
import { Currentroute } from '../../models/currentroute';
import { Userpreferences } from '../../models/userpreferences';
import { skip } from 'rxjs/operators';
import { CustomerErrorHandler } from '../../customer-error-handler';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent implements OnInit {


  public populationdet$ = new Observable<any>();
  public gridconfig$ = new Observable<any>();
  public gridData: any;
  public Exceldata: any;
  public spinnervisibility = true;
  private addNewPop = 'ADD';
  private updatePop = 'UPDATE';
  private gridname = 'POPULATIONS';
  public intialgridstate: Gridcolumnconfig[];
  public configuredgridstate: Gridcolumnconfig[];
  public dialogOpened = false;
  public gridcolumnchanged = false;
  public gridstate: Gridcolumnconfig[];
  public pagesize: Array<number> = [];
  //Advance filter//
  public gridheight = 600;

  public resetflag = false;
  public AdvanceQueryWindow = false;
  public executedQuery: Array<any> = [];
  public querylst$: Observable<any>;
  public filterdet: string;
  public showadvancefilter = true;
  public showcommonfilter = true;
  public AdvanceFilter: string;

  public GridFilterconditon: Array<any> = [];
  public colwidth='col-xs-2 col-sm-2 col-md-2';
  //

  public userInfo$: Observable<any>;
  public routerInfo$: Observable<any>;

  public userName: string;
  public userprefdet: Userpreferences = new Userpreferences();

  public commonfilter: string;


  public state: State = {
    skip: 0,
    take: 100,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      //filters:[]
      filters: [{ field: 'Isdeleted', operator: 'eq', value: false }]
    }
  };




  constructor(private store: Store<AppState>, private router: Router) {

    this.pagesize = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  }


  ngOnInit() {

    this.spinnervisibility = true;
    this.userInfo$ = this.store.select(state => state.userdetials.UserName);
    this.userInfo$.subscribe(data => {

      if (typeof data != 'undefined') {

        this.userName = data;
      }

    });

    this.userprefdet.key = 'GridColumnDet';
    this.userprefdet.userName = this.userName;
    this.GridColumnsInit();
    this.loadGrid();
    this.configuredgridstate = this.intialgridstate;
    this.store.dispatch(new GridConfigAction.GetGridColumns(this.userprefdet));
    this.gridconfig$ = this.store.select(state => state.GridColumnDet);
    this.gridconfig$.subscribe(data => {
      if (typeof data != 'undefined') {

        const configdet = data.filter(g => g.gridname == this.gridname);

        this.gridstate = data.filter(g => g.gridName != this.gridname);
        if ((configdet.length != 0) && (typeof configdet.length != 'undefined')) {


          this.configuredgridstate = configdet;
          this.gridcolumnchanged = true;

        }

      }
    });

    this.setcurrentroute();

    this.applyexistingfilter(null);


  }


  loadGrid() {

    this.store.dispatch(new PopulationAction.LoadPopulation);
    this.populationdet$ = this.store.select(state => state.Populationlst);
    this.populationdet$.subscribe(data => {

      this.gridData = process(data, this.state);
      this.Exceldata = process(data, this.state).data;

      if (process(data, this.state).data.length > 0) {
        this.spinnervisibility = false;
      }

    }



    );

  }
  dataStateChange(newstate: DataStateChangeEvent) {

    this.state = newstate;
    this.populationdet$.subscribe(data => {

      this.gridData = process(data, this.state);
      this.Exceldata = process(data, this.state).data;

    });

  }

  editClick({ dataItem, rowIndex }: any): void {
    const currouteInfo = new Currentroute();
    const extrouteInfo$ = this.store.select(store => store.currentRouteDet);
    extrouteInfo$.subscribe(data => {

      currouteInfo.logopath = data.logopath;
      currouteInfo.tokenValidity = data.tokenValidity;
      currouteInfo.expdate = data.expdate;
      currouteInfo.commontfilterText = this.commonfilter;
      currouteInfo.AdvancedfilterText = this.filterdet;

    });


    currouteInfo.description = dataItem.Description;
    currouteInfo.path = 'Home/UpdatePopulation';

    this.store.dispatch(new HomepageActions.ValidateTokenSucessAction(currouteInfo));

    this.router.navigate(['Home/UpdatePopulation', this.updatePop, dataItem.Id]);

  }


  gridFilter(event) {

    let srchText = (event);



    if (srchText != null) {
      srchText = srchText.toLowerCase();
      this.commonfilter = srchText;
      this.showadvancefilter = false;
    }




    if (event.length != 0) {



      this.populationdet$.subscribe(data => {

        this.gridData = process(data.filter(data => (data.Name.toLowerCase()
          + data.Description.toLowerCase() + data.CreatedDateTime + data.LastModifiedDateTime + data.CreatedBy.toLowerCase() +
          data.LastModifiedByUser.toLowerCase() + data.IsDeleted).includes(srchText)), this.state).data;

        this.Exceldata = process(data.filter(data => (data.Name.toLowerCase()
          + data.Description.toLowerCase() + data.CreatedDateTime + data.LastModifiedDateTime + data.CreatedBy.toLowerCase() +
          data.LastModifiedByUser.toLowerCase() + data.IsDeleted
        ).includes(srchText)), this.state).data;
      });


    } else {

      this.populationdet$.subscribe(data => {
        this.gridData = process(data, this.state);
        this.Exceldata = process(data, this.state).data;
      });
      this.showadvancefilter = true;
    }



  }

  Addnew() {


    this.router.navigate(['Home/UpdatePopulation', this.addNewPop, 0]);


  }

  GridColumnsInit() {

    this.intialgridstate = [
      {
        gridname: this.gridname,
        fieldname: 'Name',
        titlename: 'Name',
        width: '200',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'Populations'

      },

      {
        gridname: this.gridname,
        fieldname: 'Description',
        titlename: 'Description',
        width: '500',
        hiddenstate: false,
        columnchanged: true,
        filterType: '',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'Populations'

      },

      {
        gridname: this.gridname,
        fieldname: 'CreatedDateTime',
        titlename: 'Created Date Time',
        width: '200',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'date',
        datefiled: true,
        childColumnName: '',
        childColumnType: '',
        tableName: 'Populations'
      },
      {
        gridname: this.gridname,
        fieldname: 'LastModifiedDateTime',
        titlename: 'Last Modified Date Time',
        width: '200',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'date',
        datefiled: true,
        childColumnName: '',
        childColumnType: '',
        tableName: 'Populations'
      },
      {
        gridname: this.gridname,
        fieldname: 'CreatedBy',
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
        fieldname: 'LastModifiedByUser',
        titlename: 'Last Modified User',
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
        fieldname: 'Isdeleted',
        titlename: 'Is Deleted',
        width: '150',
        hiddenstate: false,
        columnchanged: true,
        filterType: 'boolean',
        datefiled: false,
        childColumnName: '',
        childColumnType: '',
        tableName: 'Populations'
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

    }

    this.userprefdet.griddet = this.configuredgridstate;
    this.store.dispatch(new GridConfigAction.SetGridColumns(this.userprefdet));
    this.dialogOpened = false;
  }
  //Advance filter
  AdvanceQueryWindowOpen() {

    this.showcommonfilter = false;
    this.AdvanceQueryWindow = true;
    this.gridheight = 540;
    const userInfo$ = this.store.select(state => state.userdetials.UserName);
    userInfo$.subscribe(data => {

      let savedqryreqdet: AdvanceSearch = new AdvanceSearch();

      savedqryreqdet.username = data;
      savedqryreqdet.gridname = this.gridname;


      if ((data != null) || (typeof data != 'undefined')) {
        this.store.dispatch(new AdvanceSearchAction.GetSavedQuery(savedqryreqdet));
        this.querylst$ = this.store.select(state => state.AdvanceSearchDet);

      }
    });


  }


  closeAdvancesearch(event) {

    this.AdvanceQueryWindow = false;
    this.gridheight = 600;
    this.showcommonfilter = true;
  }

  submitquery(event) {

    this.spinnervisibility = true;
    this.executedQuery = event.Criteria;
    this.store.dispatch(new PopulationAction.SubmitPopulationQuery(event.Criteria));
    const LatestDet$ = this.populationdet$.pipe(skip(1));
    LatestDet$.subscribe(data => {


      this.gridData = process(data, this.state);
      this.Exceldata = process(data, this.state).data;
      this.spinnervisibility = false;

    });

    this.resetflag = true;
  }

  gridreset() {
    this.spinnervisibility = true;
    this.loadGrid();
    this.resetflag = false;
  }

  savequery(event) {
    var userName;
    const userInfo$ = this.store.select(state => state.userdetials.UserName);
    userInfo$.subscribe(data => {
      userName = data;
    })

    let advancedet = new AdvanceSearch();
    advancedet.queryobj = this.executedQuery;
    advancedet.description = event;
    advancedet.username = userName;
    advancedet.gridname = this.gridname;
    this.filterdet = event;

    this.store.dispatch(new AdvanceSearchAction.SaveQuery(advancedet));

    const currouteInfo = new Currentroute();
    const extrouteInfo$ = this.store.select(store => store.currentRouteDet);
    extrouteInfo$.subscribe(data => {

      currouteInfo.logopath = data.logopath;
      currouteInfo.tokenValidity = data.tokenValidity;
      currouteInfo.expdate = data.expdate;
      currouteInfo.commontfilterText = this.commonfilter;
      currouteInfo.AdvancedfilterText = this.filterdet;

    });



    currouteInfo.description = 'Populations';
    currouteInfo.path = 'Home/Population';


    this.store.dispatch(new HomepageActions.ValidateTokenSucessAction(currouteInfo));
  }

  columnresize(event) {
    var obj = event;
    let griddet = this.configuredgridstate.filter(g => g.gridname == this.gridname && g.fieldname == obj[0].column.field);
    griddet[0].width = obj[0].newWidth;
    this.store.dispatch(new GridConfigAction.SetGridColumnsWidth(griddet));
    this.userprefdet.griddet = this.configuredgridstate;
    this.store.dispatch(new GridConfigAction.SetGridColumns(this.userprefdet));

  }


  settingclose(event) {
    if (event == true) {
      this.dialogOpened = false;
    }
  }

  applyexistingfilter(event) {

    if (event != null) {
      this.GridFilterconditon = [];
      event.filters.forEach(item => {
        this.GridFilterconditon.push(item);

      });
    }
    if (this.commonfilter != null) {
      this.gridFilter(this.commonfilter);
    }


  }

  setcurrentroute() {
    const currouteInfo = new Currentroute();
    const extrouteInfo$ = this.store.select(store => store.currentRouteDet);
    extrouteInfo$.subscribe(data => {

      currouteInfo.logopath = data.logopath;
      currouteInfo.tokenValidity = data.tokenValidity;
      currouteInfo.expdate = data.expdate;
      currouteInfo.commontfilterText = data.commontfilterText;
      this.commonfilter = data.commontfilterText;
      this.AdvanceFilter = data.AdvancedfilterText;

    });


    currouteInfo.description = 'Populations';
    currouteInfo.path = 'Home/Population';

    this.store.dispatch(new HomepageActions.ValidateTokenSucessAction(currouteInfo));
  }
}
