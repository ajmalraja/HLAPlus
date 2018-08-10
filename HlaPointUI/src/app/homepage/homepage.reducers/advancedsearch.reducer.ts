import {Store } from '@ngrx/store'
import { State } from '@ngrx/store/src/state';
import {AdvanceSearch} from '../../models/advancesearch'
import {AppState} from '../../models/app-state';
import { Observable } from 'rxjs/Observable';
import * as AdvanceSearchActions from '../homepage.actions/advancesearch.action';

const ActiveSearchDet=new Observable<any>();


export function AdvanceSearchReducer(state = ActiveSearchDet,action:AdvanceSearchActions.Action)
{

  switch(action.type) {


    case AdvanceSearchActions.SAVE_QUERY:
    {
      return State
    }

    case AdvanceSearchActions.GET_SAVED_QUERY:
    {
      return action.payload;
    }
    case AdvanceSearchActions.GET_SAVED_QUERY_SUCESS:
    {
      return  action.payload;
    }
    case AdvanceSearchActions.SAVE_QUERY_SUCESS:
    {
      return  action.payload;
    }
  }


  }


