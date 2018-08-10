import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';


import { IPopulation } from '../population/ipopulation';
import {AppState} from '../../models/app-state';
import { Populationdet} from '../population/populationdet';
import * as PopulationAction from '../homepage.actions/population.action';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operator/merge';

const PopulationLst = new Observable<any>();
export function PopulationReducer(state = PopulationLst , action: PopulationAction.Action ) {
        switch (action.type) {

        case PopulationAction.LOAD_POPULATION:
        {

        return state;

        }

        case PopulationAction.LOAD_POPULATION_SUCESS:
        {
         let poplst = Array<Populationdet>();

         action.payload.forEach(p => {

            var pop:Populationdet=new Populationdet();
              pop.Id =  p.Id;
              pop.Name =  p.Name;
              pop.Description =   p.Description;
              pop.CreatedDateTime =  new Date(p.CreatedDateTime);
              pop.LastModifiedDateTime =  new Date(p.LastModifiedDateTime);
              pop.CreatedBy =  p.CreatedBy;
              pop.LastModifiedByUser=p.LastModifiedByUser;
              pop.USerName =p.USerName;
              pop.Isdeleted =  p.IsDeleted;

            poplst.push(pop);
         });

       //return action.payload;
       return poplst;
        }
        case PopulationAction.LOAD_POPULATION_FAILED:
        {
          return state;
        }
        case PopulationAction.SUBMIT_POPULATION_QUERY:
        {

          return state;
        }

        default: {
          return state;
      }


}
}
