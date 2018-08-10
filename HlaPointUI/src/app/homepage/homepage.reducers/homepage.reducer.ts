


import { UserToken } from '../../account/login.models/user-token';
import { Currentroute } from '../../models/currentroute';
import * as HomePageActions from '../homepage.actions/homepage.action';
import {Store} from '@ngrx/store';
import { State } from '@ngrx/store/src/state';
import {AppState} from '../../models/app-state';
import { ICurrentroute } from '../../models/Icurrentroute';


let CurrentRouteState: ICurrentroute =new Currentroute() ;

export function HomePageReducer(state = CurrentRouteState, action: HomePageActions.Action) {

    switch (action.type) {

        case HomePageActions.VALIDATE_TOKEN:
        {
           CurrentRouteState =action.payload;
          const curdate = new Date();

          if(curdate <= action.payload.expdate) {
            CurrentRouteState.tokenValidity = true;

          } else           {
              CurrentRouteState.tokenValidity = false;
            }

          return CurrentRouteState;
        }
        case HomePageActions.TOKEN_VALIDATION_SUCESS:
        {

            return action.payload;
        }
        case HomePageActions.TOKEN_VALIDATION_FAILED:
        {

            return action.payload;
        }

        default: {
            return state;
        }
    }

}
