import { Injectable } from '@angular/core';
import { PopulationService } from '../homepage.service/population-service.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as UpdatePopulationAction from '../homepage.actions/updatepopulation.action';
import * as Population from '../homepage.actions/population.action';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()

export class UpdatePopulationEffects{


  constructor(
    private populationservice: PopulationService,
    private action$: Actions
  )  {


  }


@Effect()
populationnew$: Observable<Action>= this.action$
.ofType(UpdatePopulationAction.UPDATE_POPULATION)
.map(toPayload)
.switchMap((payload) => this.populationservice.UpdatePopulation(payload)
.map(data => (new UpdatePopulationAction.UpdatePopulationSucess(data) ))
)



}
