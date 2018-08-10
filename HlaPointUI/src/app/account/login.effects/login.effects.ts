import { Injectable } from '@angular/core';
import { LoginService } from '../login.services/login.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as loginActions from './../login.actions/login.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { UserCredentials } from '../login.models/user-credentials';
import { toPayload } from '@ngrx/effects/src/util';
import { UserToken } from '../login.models/user-token';
import { error } from 'selenium-webdriver';
import { ValidateUserFailedAction, VALIDATE_USER_FAILED } from './../login.actions/login.action';


@Injectable()

export class LoginEffects {

  constructor(

    private loginService: LoginService,
    private action$: Actions
  ) {

  }

  @Effect()
  validateUser$: Observable<Action> = this.action$
    .ofType(loginActions.VALIDATE_USER)
    .map(toPayload)
    .switchMap((payload) => this.loginService.validateUserGetToken(payload)
      .map(data => (new loginActions.ValidateUserSucessAction(data)))
      .catch(error => Observable.of({ type: VALIDATE_USER_FAILED, payload: error }))
    )
    .catch(error => Observable.of({ type: VALIDATE_USER_FAILED, payload: error }));



  @Effect()
  RefreshUserDet$: Observable<Action> = this.action$
    .ofType(loginActions.REFRESH_TOKEN)
    .map(toPayload)
    .switchMap((payload) => this.loginService.RefreshToken(payload)
      .map(data => (new loginActions.ValidateUserSucessAction(data)))
      .catch(error => Observable.of({ type: VALIDATE_USER_FAILED, payload: error }))
    )
    .catch(error => Observable.of({ type: VALIDATE_USER_FAILED, payload: error }));


}


