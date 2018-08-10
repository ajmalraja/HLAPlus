import { Injectable } from '@angular/core';
import {UserprefService} from '../homepage.service/userpref.service'
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import  * as GridConfigAction from '../homepage.actions/gridconfig.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';


@Injectable()


export class GridConfigEffects{

  constructor(
    private userPreferenceService: UserprefService,
    private action$: Actions
  )  {


  }

  @Effect()
userperfdet$:Observable<Action>=this.action$
.ofType(GridConfigAction.SET_GRIDCOLUMNS)
.map(toPayload)
.switchMap((payload)=> this.userPreferenceService.SaveUserPreference(payload.key,payload.griddet,payload.userName)
.map(data =>(new GridConfigAction.SaveUserPreferenceSucess(data)))
.catch(error => (Observable.of({type:GridConfigAction.GRIDCOLUMNS_PROCESS_ONERROR,paylaod:error})))
)
.catch(error => (Observable.of({type:GridConfigAction.GRIDCOLUMNS_PROCESS_ONERROR,paylaod:error})));

@Effect()
userperfgetdet$:Observable<Action>=this.action$
.ofType(GridConfigAction.GET_GRIDCOLUMNS)
.map(toPayload)
.switchMap((payload)=> this.userPreferenceService.GetUserPerference(payload.key,payload.userName)
.map(data =>(new GridConfigAction.GetUserPreferenceSucess(data)))
.catch(error => (Observable.of({type:GridConfigAction.GRIDCOLUMNS_PROCESS_ONERROR,paylaod:error})))
)
.catch(error => (Observable.of({type:GridConfigAction.GRIDCOLUMNS_PROCESS_ONERROR,paylaod:error})))
}
