import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Gridcolumnconfig } from '../../models/gridcolumnconfig';


@Component({
  selector: 'app-gridcolumnconfig',
  templateUrl: './gridcolumnconfig.component.html',
  styleUrls: ['./gridcolumnconfig.component.css']
})
export class GridcolumnconfigComponent implements OnInit {

  @Input()
  gridcolumndet: Gridcolumnconfig[];

  @Input()
  selgridcolumndet: Gridcolumnconfig[];

  @Input()
  gridcolumnchanged: boolean;

  @Output()
  gridSettingChange: EventEmitter<Gridcolumnconfig[]> = new EventEmitter<Gridcolumnconfig[]>();

  @Output()
  closevent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public selectedcolumndet: Gridcolumnconfig[] = [];
  public Availablecolumndet: Gridcolumnconfig[] = [];
  public selcol: Gridcolumnconfig = new Gridcolumnconfig();
  public remcol: Gridcolumnconfig = new Gridcolumnconfig();

  constructor(private _location: Location) { }

  ngOnInit() {
    if (this.gridcolumnchanged) {

      this.gridcolumndet.forEach(a => {
        var refreshed = false
        this.selgridcolumndet.forEach(s => {
          if (s.titlename == a.titlename) {
            refreshed = true
          }
        })
        if (!refreshed) {
          this.Availablecolumndet.push(a);
        }
      })


      this.selectedcolumndet = this.selgridcolumndet;

    }
    else {

      this.Availablecolumndet = this.gridcolumndet;

    }

  }

  MoveToSelected() {


    if (this.selcol[0].length != 0) {
      this.selectedcolumndet.push(this.selcol[0]);
    }

    this.Availablecolumndet = this.Availablecolumndet.filter(data => data.titlename != this.selcol[0].titlename);
    this.selcol[0] = [];
  }
  MoveToAvailable() {

    if (this.remcol[0].length != 0) {
      this.Availablecolumndet.push(this.remcol[0]);
    }

    this.selectedcolumndet = this.selectedcolumndet.filter(data => data.titlename != this.remcol[0].titlename);
    this.remcol[0] = [];
  }

  MoveAllToSelected() {



    this.Availablecolumndet.forEach(i => {
      this.selectedcolumndet.push(i);
      this.Availablecolumndet = this.Availablecolumndet.filter(data => data.titlename != i.titlename);
    });


    this.selcol[0] = [];
  }
  MoveToAllAvailable() {

    this.selectedcolumndet.forEach(s => {

      this.Availablecolumndet.push(s);
      this.selectedcolumndet = this.selectedcolumndet.filter(data => data.titlename != s.titlename);
    });


  }
  MoveUp() {

    if (this.remcol[0].length != 0) {
      var i = this.selectedcolumndet.findIndex(obj => obj.titlename == this.remcol[0].titlename);
      this.selectedcolumndet.splice(i - 1, 0, this.remcol[0]);
      this.selectedcolumndet.splice(i + 1, 1);
      if (i == 1) {
        this.remcol[0] = [];
      }
    }
  }

  MoveDown() {

    if (this.remcol[0].length != 0) {

      var i = this.selectedcolumndet.findIndex(obj => obj.titlename == this.remcol[0].titlename);
      this.selectedcolumndet.splice(i, 1);
      this.selectedcolumndet.splice(i + 1, 0, this.remcol[0]);
      if (i == this.remcol[0].length) {
        this.remcol[0] = [];
      }
    }
  }
  applychanges() {

    const isdeletedcol: Gridcolumnconfig = {
      gridname: this.selectedcolumndet[0].gridname,
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
    }
    let isdelcolumncheck = false;
    this.selectedcolumndet.forEach(element => {

      if (element.fieldname.toUpperCase() == 'ISDELETED') {
        isdelcolumncheck = true;
      }

    });
    if (isdelcolumncheck == false) {
      this.selectedcolumndet.push(isdeletedcol);
    }
    this.gridSettingChange.emit(this.selectedcolumndet);
  }

  close() {
    this.closevent.emit(true);
  }


}
