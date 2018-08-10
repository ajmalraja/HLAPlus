import { Component,OnInit } from '@angular/core';
import { AppState } from '../../models/app-state';
import { Store } from '@ngrx/store';
import * as HaplotypeActions from '../homepage.actions/haplotype.action';
import * as HomepageActions from '../homepage.actions/homepage.action';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Currentroute } from '../../models/currentroute';
import { timer } from 'rxjs/observable/timer';
import { Chartdata } from '../../models/chartdata';
import { Router } from '@angular/router';


@Component({
  selector: 'app-haplotypechart',
  templateUrl: './haplotypechart.component.html',
  styleUrls: ['./haplotypechart.component.css']
})
export class HaplotypechartComponent  {
  public spinnervisibility=true;
  public chartData$:Observable<any>;
  public chartdata:Array<Chartdata> = new Array<Chartdata>();


  constructor(private store: Store<AppState>,private router:Router) {


  }

ngOnInit()
{
  this.chartData$=this.store.select(store => store.Haplotypelist.chartData);
  this.chartData$.subscribe(data => {

    if (typeof data != 'undefined') {
     if ( data.length >0 )
     {
       this.chartdata=[];
         data.forEach(element => {
           this.chartdata.push(element);
         });
         this.spinnervisibility = false;
     }
   }
   });


}

}
