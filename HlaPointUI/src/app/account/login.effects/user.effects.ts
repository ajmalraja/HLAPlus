import { Injectable } from '@angular/core';
import { UserListService } from '../login.services/userservice.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as UserAction from '../login.actions/user.actions';
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
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()

export class UserListEffects{


  constructor(
    private userListService: UserListService,
    private action$: Actions
  )  {


  }

@Effect()
UserList$:Observable<Action>=this.action$
.ofType(UserAction.LOAD_USERLIST)
.switchMap((payload) => this.userListService.LoadUserListService()
.map(data =>(new UserAction.LoadUserListSucess(data) ))
)





}
