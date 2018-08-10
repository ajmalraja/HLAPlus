import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';


import {IGridcolumnconfig } from '../../models/igridcolumnconfig';
import {AppState} from '../../models/app-state';
import {Gridcolumnconfig} from '../../models/gridcolumnconfig';
import * as GridConfigAction from '../homepage.actions/gridconfig.action';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operator/merge';

const gridconfigstate = new Observable<any>();
export function GridConfigReducer(state = gridconfigstate , action: GridConfigAction.Action ) {
        switch (action.type) {

        case GridConfigAction.SET_GRIDCOLUMNS:
        {


        return action.payload.griddet;

        }

        case GridConfigAction.GET_GRIDCOLUMNS:
        {

        return state;

        }
        case GridConfigAction.SAVE_GRIDCOLUMNS_SUCESS:
        {

        return state;

        }
        case GridConfigAction.GET_GRIDCOLUMNS_SUCESS:
        {

          return JSON.parse(action.payload);

        }
        case GridConfigAction.SET_GRIDCOLUMNS_WIDTH:
        {

         state.forEach( data =>

          {
            if((data.gridname==action.payload[0].gridname) &&
                (data.fieldname==action.payload[0].fieldname))            {
              data.width=action.payload[0].width;

            }
          }

        )

        return state;

        }



        default: {
          return state;
      }


}
}
