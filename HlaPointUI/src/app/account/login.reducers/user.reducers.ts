import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';


import { Iuser } from '../user/iuser'
import {AppState} from '../../models/app-state';
import { User } from '../user/user';
import * as UserAction from '../login.actions/user.actions';
import { Observable } from 'rxjs/Observable';

const UserLst = new Observable<Iuser>();
export function UserActionReducer(state = UserLst , action: UserAction.Action ) {
        switch (action.type) {

        case UserAction.LOAD_USERLIST:
        {

        return state;

        }

        case UserAction.LOAD_USERLIST_SUCESS:
        {

        return action.payload;

        }

        default: {
          return state;
      }


}
}
