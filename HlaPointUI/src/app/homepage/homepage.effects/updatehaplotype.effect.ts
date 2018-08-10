import { Injectable } from '@angular/core';
import { HaplotypeService } from '../homepage.service/haplotyp-service.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as UpdateHaplotypeAction from '../homepage.actions/UpdateHaplotype.action';
import * as Population from '../homepage.actions/population.action';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()

export class UpdateHaplotypeEffects{


  constructor(
    private haplotypeservice: HaplotypeService,
    private action$: Actions
  )  {


  }


@Effect()
populationnew$: Observable<Action>= this.action$
.ofType(UpdateHaplotypeAction.UPDATE_HAPLOTYPE)
.map(toPayload)
.switchMap((payload) => this.haplotypeservice.UpdateHaplotype(payload)
.map(data => (new UpdateHaplotypeAction.UpdateHaplotypeSucess(data) ))
)



}
