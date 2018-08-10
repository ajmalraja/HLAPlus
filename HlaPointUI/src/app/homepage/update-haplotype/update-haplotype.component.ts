import { Component, OnInit } from '@angular/core';
import { Populationdet } from '../population/populationdet';
import { BrowserModule } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AppState } from '../../models/app-state';
import {Store} from '@ngrx/store';
import * as PopulationAction from '../homepage.actions/population.action';
 import * as UpdateHaplotypeAction from '../homepage.actions/UpdateHaplotype.action';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute } from '@angular/router';
import { IPopulation } from '../population/ipopulation';
import { Haplotype } from '../haplotype/haplotype';
import { UpdateHaplotypeSucess } from '../homepage.actions/UpdateHaplotype.action';


@Component({
  selector: 'app-update-haplotype',
  templateUrl: './update-haplotype.component.html',
  styleUrls: ['./update-haplotype.component.css']
})
export class UpdateHaplotypeComponent implements OnInit {

  private requiredAction: string;
  public EditMode = false;
  public spinnervisibility = false;
  public newHaplotype: Haplotype= new Haplotype();
  public Haplotypedet$= new Observable<any>();
  public populationdet$= new Observable<any>();
  public UpdatedHaplotype$= new Observable<any>();
  public PopulationNamelst: Array<Populationdet>=[];
  public selectedPop;

  constructor(private _location: Location, private store: Store<AppState>, private router:Router,private activateroute:ActivatedRoute) { }

  // Error Messages

  public PopulationNameError = 'Population Name is ';
  public HaplotypeError= 'Haplotype is ';
  public CountError= 'Count is';
  public FrequencyError= 'Frequency is';
  public LinkagedisequError='Linkage Disequilibrium is';
  public PopNamePlaceholder;

  private  addNewHap= 'ADD';
  private  updateHap= 'UPDATE';
  private  DeleteHap= 'DELETE';

  ngOnInit() {
    this.PopNamePlaceholder = 'Select Population Name';
    let id = 0;

    this.activateroute.params.subscribe(params => {
    this.requiredAction = params['requiredAction'];
    id = params['Id'];
    if (this.requiredAction === this.updateHap)  {
      this.EditMode = true;
      this.loadData(id);

    }

   });
   this.store.dispatch(new PopulationAction.LoadPopulation);
   const populationdet$ = this.store.select(state => state.Populationlst);
   populationdet$.subscribe(data => {
     this.PopulationNamelst = data;
   });
  }

  loadData(Id: number)  {

    const Haplotypedet$ = this.store.select(state => state.Haplotypelist.haplotypedata);
    Haplotypedet$.subscribe(data => {
        const hap =  data.filter(p => p.Id == Id );
        this.newHaplotype = hap[0];
        this.selectedPop=this.newHaplotype.populationName;

        this.PopNamePlaceholder = this.newHaplotype.populationName;
    });


  }

  onsubmit() {

                 this.spinnervisibility = true;
                 let updHaplotype=new Haplotype();
                const userInfo$ = this.store.select(state => state.userdetials.UserName);
                userInfo$.subscribe(data =>   {

                          if ( ( data != null) || (typeof data !== 'undefined' )) {

                            this.newHaplotype.isDeleted = false;
                            this.newHaplotype.CreatedByUser = data;
                            if (this.requiredAction === this.addNewHap)    {

                                  this.newHaplotype.Id = 0;
                                }

                                if (this.requiredAction === this.DeleteHap)
                                {
                                  this.newHaplotype.isDeleted = true;
                                  this.newHaplotype.LastModifiedUser = data;
                                }


                                  this.newHaplotype.LastModifiedUser = data;


                                  this.store.dispatch(new UpdateHaplotypeAction.UpdateHaplotype(this.newHaplotype));

                                  this.UpdatedHaplotype$ = this.store.select(state => state.UpdatedHaplotype.Id);

                                  this.UpdatedHaplotype$.subscribe( data  => {

                                    if (data !== null || (typeof data  !== 'undefined')) {

                                      if (this.requiredAction !== this.addNewHap)    {

                                      if (data === this.newHaplotype.Id) {
                                          this.spinnervisibility = false;
                                        this.router.navigate(['Home/Haplotype']);
                                        }

                                      } else {
                                        if (data !== this.newHaplotype.Id) {
                                          this.spinnervisibility = false;
                                        this.router.navigate(['Home/Haplotype']);
                                        }


                                      }
                                    }

                                  } );



                        }
            });

  }

  backtohome()  {
    this._location.back();
  }

  callDelete()  {
    this.requiredAction = this.DeleteHap;
  }
  valueChange($event)
  {
    this.newHaplotype.populationName=this.selectedPop.Name;
  }
}
