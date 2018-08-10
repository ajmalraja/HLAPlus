import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';
import { Haplotype } from '../haplotype/haplotype';
import {AppState} from '../../models/app-state';

import * as UpdateHaplotypeAction from '../homepage.actions/UpdateHaplotype.action';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operator/merge';
import { Statement } from '@angular/compiler/src/output/output_ast';

let UpdateHaplotype:Haplotype = new Haplotype()

export function UpdateHaplotypeReducer(state = UpdateHaplotype , action: UpdateHaplotypeAction.Action ) {
        switch (action.type) {

        case UpdateHaplotypeAction.UPDATE_HAPLOTYPE:
        {

        state.Id=0;
        return state;

        }
        case UpdateHaplotypeAction.UPDATE_HAPLOTYPE_SUCESS:
        {
          

         state.Id=action.payload[0].Id
        return state;

        }


        default: {
          return state;
      }


}
}
