import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { Gridcolumnconfig } from '../../models/gridcolumnconfig';
import { NgControlStatus } from '@angular/forms/src/directives/ng_control_status';
import { Observable } from 'rxjs/Observable';
import { identifierName } from '@angular/compiler';
import { AdvanceSearch } from '../../models/advancesearch';


@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.css']
})
export class AdvancesearchComponent implements OnInit {

  @Output()
  closewindow:EventEmitter<boolean>=new EventEmitter<boolean>();

  @Output()
  submitquery:EventEmitter<any>=new EventEmitter<any>();

  @Output()
  queryname:EventEmitter<string>=new EventEmitter<string>();

  @Input()
  gridcolumn:Gridcolumnconfig[];

  @Input()
  AutoPopulate$:Observable<any>;

  @Input()
  QueryList$:Observable<any>;

  public AdvanceSearchForm: FormGroup;
  public count=0;
  public Reloperator:Array<string>=['And','Or','And (',') And','Or (',') Or']
  public AvaliableFields:Array<string>=[]
  public OperatorList:Array<Array<string>>=[];
  public AutoCompleteList:Array<Array<string>>=[];
  private  BooleanType='boolean';
  private  DateType='date';
  private  StringType='';
  private NumericType='numeric';
  private BoolOperatorlist:Array<string>=['Equal To','Not Equal To'];
  private NumericOperatorlist:Array<string>=['Greater Than','Less Than','Equal To',
                                              'Greater Than and Equal To','Less Than and Equal To','Not Equal To'];
  private DateOperatorlist:Array<string>=['Greater Than','Less Than','Equal To','Greater Than and Equal To',
                                            'Less Than and Equal To','Not Equal To'];
  private StringOperatorlist:Array<string>=['Contains','Starts With','Ends With','Equal To','Not Equal To','Not Contains']
  public AutocompleteDet$:Observable<any>=new Observable<any>();
  public coltypevalue:Array<string>=[];
  public dbcolname:Array<string>=[];
  public childcolname:Array<string>=[];
  public childcoltype:Array<string>=[];
  public tableName:Array<string>=[];
  public datefield:boolean=false;
  public gridname:Array<string>=[];
  public savedialogOpened=false;
  public querysubmitracker=false;
  public queryDescription='';
  public queryDescCheck=false;
  public savedqueryvisibility=false;
  public querylst$:Observable<any>=new Observable<any>();
  public savedqrydet:Array<AdvanceSearch>=[];
  public selectedqry:any;
  public datevalue:Array<Date>=[]
  constructor(private AdvFilterForm: FormBuilder) {

  }

  ngOnInit() {

    this.AdvanceSearchForm = this.AdvFilterForm.group({
      Criteria: this.AdvFilterForm.array([this.buildcriteria()])
    });
    this.AvaliableFields=this.gridcolumn.map(f => f.titlename);
    this.AutocompleteDet$=this.AutoPopulate$;
    this.querylst$=this.QueryList$
    }


  close()
  {
    this.savedqueryvisibility=false;
    if (this.querysubmitracker)
    {

      this.savedialogOpened=true;
      return;
    }
    this.closeDialog();

  }

  buildcriteria(){
    this.count=this.count+1;
    return this.AdvFilterForm.group({
      relOperator:['', ],
      field: ['', Validators.required],
      columnName:[''],
      columnType:[''],
      gridName:[''],
      operator: ['', Validators.required],
      tableName:[''],
      childcolname:[''],
      childcoltype:[''],
      value: ['', Validators.required]
  });
  }
  addCriteria()
  {
      const control = <FormArray>this.AdvanceSearchForm.controls['Criteria'];
      control.push(this.buildcriteria());


  }
  RemoveCriteria(i:number)
  {

      const control = <FormArray>this.AdvanceSearchForm.controls['Criteria'];
      if (i !=0){
        control.removeAt(i);
      }

  }
  loadoperationlist(i:number)
  {
    const control = <FormArray>this.AdvanceSearchForm.controls['Criteria']
    const formelement=control.at(i);
    const fieldvalue =formelement.value;
    var datatype=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].filterType;
    this.dbcolname[i]=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].fieldname;
    this.childcolname[i]=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].childColumnName;
    this.childcoltype[i]=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].childColumnType;
    this.tableName[i]=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].tableName;
    this.gridname[i]=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].gridname;
    this.datefield=this.gridcolumn.filter(d => d.titlename == fieldvalue.field)[0].datefiled;
    if ( this.datefield)
    {
      datatype=this.DateType;
    }

    switch(datatype)
    {
      case this.BooleanType:
      {
        this.coltypevalue[i]='boolean'
        this.OperatorList[i]=this.BoolOperatorlist;
        break;
      }
      case this.StringType:
      {
        this.coltypevalue[i]='string'
        this.OperatorList[i]=this.StringOperatorlist;
        break;
      }
      case this.NumericType:
      {
        this.coltypevalue[i]='numeric'
        this.OperatorList[i]=this.NumericOperatorlist;
        break;
      }
      case this.DateType:
      {
        this.coltypevalue[i]='date';
        this.OperatorList[i]=this.DateOperatorlist;
        break;
      }

    }

  }
  Autocomplete(i:number)
  {
    const control = <FormArray>this.AdvanceSearchForm.controls['Criteria']
    const formelement=control.at(i);
    const fieldvalue =formelement.value.columnName


    this.AutocompleteDet$.subscribe(data =>
      {
          this.AutoCompleteList[i]=data.map(l => l[this.dbcolname[i]]);


      }
    );
  }
  querysubmit()
  {

    this.submitquery.emit(this.AdvanceSearchForm.value);
    this.querysubmitracker=true;
    this.queryDescCheck=true;

  }
  querysave()
  {

    this.querysubmitracker=false;
    if (this.queryDescription=='')
    {

      return false;
    }
    else{
      this.queryname.emit(this.queryDescription);
      return true;
    }


  }
  closeDialog()
  {
    this.savedialogOpened=false;
    this.savedqueryvisibility=false;
    this.closewindow.emit(false);
  }
  querysaveclose()
  {

    if (this.querysave())
    {
      this.closeDialog();
      this.close();
    }

  }

  showsavedquery()
  {
    this.savedialogOpened=true;
    this.savedqueryvisibility=true;
    this.querylst$.subscribe(

      data=>{

        this.savedqrydet=data
      }
    )

  }
 showselectedquery()
  {
    this.savedialogOpened=false;

    const control = <FormArray>this.AdvanceSearchForm.controls['Criteria'];
    while (this.count >=0)
    {

      control.removeAt(this.count);
      this.count--;
        }

    var obj=JSON.parse(this.selectedqry.QueryObject)

    obj.forEach(element => {
      this.count=this.count+1;
      this.parseoperatorlist(element.ColumnType, this.count)
      if (element.ColumnType != 'date')
      {
        var frmobj= this.AdvFilterForm.group({
          relOperator:[element.RelOperator, ],
          field: [element.Field, Validators.required],
          columnName:[element.ColumnName],
          columnType:[element.ColumnType],
          gridName:[element.gridName],
          operator: [element.Operator, Validators.required],
          tableName:[element.tableName],
          childcolname:[element.childcolname],
          childcoltype:[element.childcoltype],
          value: [element.Value, Validators.required]
      });

      }
else
      {
        var frmobj= this.AdvFilterForm.group({
          relOperator:[element.RelOperator, ],
          field: [element.Field, Validators.required],
          columnName:[element.ColumnName],
          columnType:[element.ColumnType],
          gridName:[element.gridName],
          operator: [element.Operator, Validators.required],
          tableName:[element.tableName],
          childcolname:[element.childcolname],
          childcoltype:[element.childcoltype],
          value: ['', Validators.required]
        });
        this.datevalue[this.count]=new Date(element.Value);
      }

    this.dbcolname[this.count]=element.ColumnName;
    this.coltypevalue[this.count]=element.ColumnType;
    this.childcolname[this.count]=element.childcolname;
    this.childcoltype[this.count]=element.childcoltype;
    this.tableName[this.count]=element.tableName;
    this.gridname[this.count]=element.gridName;

    control.push(frmobj);





 });
 this.querysubmit();
 this.querysubmitracker=false;
  }
parseoperatorlist(datatype:string, i)
{

  switch(datatype)
  {
    case this.BooleanType:
    {
      this.coltypevalue[i]='boolean'
      this.OperatorList[i]=this.BoolOperatorlist;
      break;
    }
    case this.StringType:
    {
      this.coltypevalue[i]='string'
      this.OperatorList[i]=this.StringOperatorlist;
      break;
    }
    case this.NumericType:
    {
      this.coltypevalue[i]='numeric'
      this.OperatorList[i]=this.NumericOperatorlist;
      break;
    }
    case this.DateType:
    {
      this.coltypevalue[i]='date';
      this.OperatorList[i]=this.DateOperatorlist;
      break;
    }

  }

}

querysavewithoutclose()
{
  this.savedialogOpened=true;
}

querydescriptionvalidation(event)
{

  
  if (this.queryDescription.length-1 >0){

    this.queryDescCheck=false;
  }
else{
  this.queryDescCheck=true;
}
}

  }
