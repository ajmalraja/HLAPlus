import { Injectable } from '@angular/core';
import {AdvancesearchService} from '../homepage.service/advancesearch.service'
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import  * as AdvanceSearchAction from '../homepage.actions/advancesearch.action'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()


export class AdvanceSearchEffects{

  constructor(
    private aAdvancesearchService: AdvancesearchService,
    private action$: Actions
  )  {


  }


@Effect()
advancesearchlst$:Observable<Action>=this.action$
.ofType(AdvanceSearchAction.GET_SAVED_QUERY)
.map(toPayload)
.switchMap((payload)=> this.aAdvancesearchService.LoadSavedQuery(payload)
.map(data =>(new AdvanceSearchAction.GetSavedQuerySucess(data))))


@Effect()
advancesearchlst2$:Observable<Action>=this.action$
.ofType(AdvanceSearchAction.SAVE_QUERY)
.map(toPayload)
.switchMap((payload)=> this.aAdvancesearchService.SaveQuery(payload.queryobj,payload.description,
  payload.username,payload.gridname)
.map(data =>(new AdvanceSearchAction.SaveQuerySucess(data))))
}
