import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';
import { Populationdet } from '../population/populationdet';
import {AppState} from '../../models/app-state';

import * as UpdatePopulationAction from '../homepage.actions/updatepopulation.action';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operator/merge';
import { Statement } from '@angular/compiler/src/output/output_ast';

let UpdatePopulation:Populationdet = new Populationdet()
export function UpdatePopulationReducer(state = UpdatePopulation , action: UpdatePopulationAction.Action ) {
        switch (action.type) {

        case UpdatePopulationAction.UPDATE_POPULATION:
        {

        state.Id=0;
        return state;

        }
        case UpdatePopulationAction.UPDATE_POPULATION_SUCESS:
        {

         state.Id=action.payload[0].Id
        return state;

        }


        default: {
          return state;
      }


}
}
