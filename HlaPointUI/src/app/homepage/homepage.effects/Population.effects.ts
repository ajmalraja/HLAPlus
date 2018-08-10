import { Injectable } from '@angular/core';
import { PopulationService } from '../homepage.service/population-service.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as PopulationAction from '../homepage.actions/population.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()

export class PopulationEffects{


  constructor(
    private populationservice: PopulationService,
    private action$: Actions
  )  {


  }

@Effect()
populationlst$:Observable<Action>=this.action$
.ofType(PopulationAction.LOAD_POPULATION)
.switchMap((payload) => this.populationservice.LoadPopulationService()
.map(data =>(new PopulationAction.LoadPopulationSucess(data) ))
.catch(error => (Observable.of({type:PopulationAction.LOAD_POPULATION_FAILED,payload: error})))
)
.catch(error => (Observable.of({type:PopulationAction.LOAD_POPULATION_FAILED,payload:error})));

@Effect()
populationnew$: Observable<Action>= this.action$
.ofType(PopulationAction.SUBMIT_POPULATION_QUERY)
.map(toPayload)
.switchMap((payload) => this.populationservice.SubmitPopulationQuery(payload)
.map(data =>(new PopulationAction.LoadPopulationSucess(data) ))
.catch(error => (Observable.of({type:PopulationAction.LOAD_POPULATION_FAILED,payload: error})))
)
.catch(error => (Observable.of({type:PopulationAction.LOAD_POPULATION_FAILED,payload: error})))


}
