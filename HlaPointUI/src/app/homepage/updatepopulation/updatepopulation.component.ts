import { Component, OnInit } from '@angular/core';
import { Populationdet } from '../population/populationdet';
import { BrowserModule } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AppState } from '../../models/app-state';
import {Store} from '@ngrx/store';
import * as UpdatePopulationAction from '../homepage.actions/updatepopulation.action';
import * as PopulationAction from '../homepage.actions/population.action';
import { Observable } from 'rxjs/Observable';
import {Router,ActivatedRoute } from '@angular/router';
import { IPopulation } from '../population/ipopulation';

@Component({
  selector: 'app-updatepopulation',
  templateUrl: './updatepopulation.component.html',
  styleUrls: ['./updatepopulation.component.css']
})
export class UpdatepopulationComponent implements OnInit {

  private requiredAction:string;
  public EditMode:boolean=false;
  public spinnervisibility:boolean=false
  public newPopulation: Populationdet= new Populationdet();
  public populationdet$= new Observable<any>();
  public UpdatedPopulation$=new Observable<any>();
  constructor(private _location: Location,private store: Store<AppState>,private router:Router,private activateroute:ActivatedRoute) { }

  // Error Messages
  public Descriptionerror: string = 'Description is ';
  public Nameerror: string='Name is ';
  //

  private  addNewPop:string='ADD';
  private  updatePop:string='UPDATE';
  private  DeletePop:string='DELETE';

  public readonlymode=true;
  public showdeletedialog=false;
  public screenname='Populations'
  ngOnInit() {
    var id:number=0;

    this.activateroute.params.subscribe(params => {
    this.requiredAction=params['requiredAction'];
    id=params['Id'];
    if (this.requiredAction == this.updatePop)
    {
      this.EditMode=true;
      this.loadData(id);

    }
    if (this.requiredAction == this.addNewPop){
      this.readonlymode=false;
    }
   });
  }

loadData(Id:number){

  const populationdet$=this.store.select(state=>state.Populationlst);
  populationdet$.subscribe(data => {

      const pop=  data.filter(p => p.Id == Id );
     this.newPopulation=pop[0];
  })

}
  onsubmit() {

    this.spinnervisibility=true;

                const userInfo$ = this.store.select(state => state.userdetials.UserName);
                userInfo$.subscribe(data =>   {

                          if ( ( data != null) || (typeof data != 'undefined' )) {

                            this.newPopulation.Isdeleted = false;
                            this.newPopulation.USerName=data;
                            if (this.requiredAction == this.addNewPop)    {

                                  this.newPopulation.Id=0;
                                }
                                if (this.requiredAction==this.DeletePop)
                                {
                                  this.newPopulation.Isdeleted=true;
                                }

                                  this.store.dispatch(new UpdatePopulationAction.UpdatePopulation(this.newPopulation));

                                  this.UpdatedPopulation$=this.store.select(state=>state.UpdatedPopulation.Id);

                                  this.UpdatedPopulation$.subscribe(data => {

                                    if (data !=null || (typeof data  != 'undefined')) {

                                      if (this.requiredAction != this.addNewPop)    {

                                      if (data==this.newPopulation.Id) {
                                          this.spinnervisibility=false;
                                          this.readonlymode=true;
                                        }

                                      } else {
                                        if (data!= this.newPopulation.Id) {
                                          this.spinnervisibility =false;
                                          this.readonlymode=true;
                                        }


                                      }
                                    }

                                  } );



                        }
            });

          this.readonlymode=true;
  }
  backtohome()
  {
    this._location.back();
  }

  callDelete()
  {
    this.requiredAction=this.DeletePop;
    this.onsubmit();
    this.backtohome();
  }


  switchtoeditmode()
  {
    this.readonlymode=false;
  }

  switchmodetocancel()
  {
    this.showdeletedialog=false;
    if (this.requiredAction == this.addNewPop)
    {
      this.backtohome();
    }
    else
    {
      this.readonlymode=true;
    }

  }

  switchtodeletemode()
  {
    this.showdeletedialog=true;
  }
}
