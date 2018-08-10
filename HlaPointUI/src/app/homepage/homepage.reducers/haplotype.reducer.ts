import { Store } from '@ngrx/store';
import { State } from '@ngrx/store/src/state';
import { AppState } from '../../models/app-state';
import { Haplotype } from '../haplotype/haplotype';
import * as HaplotypeAction from '../homepage.actions/haplotype.action';
import { Observable } from 'rxjs/Observable';
import { IHaplotypesession } from '../../models/ihaplotypesession';
import { Haplotypesession } from '../../models/haplotypesession';

let HaplotypeLst = new Haplotypesession();

export function HaplotypeReducer(state = HaplotypeLst, action: HaplotypeAction.Action) {
  switch (action.type) {

    case HaplotypeAction.LOAD_HAPLOTYPE:
      {

        return state;

      }

    case HaplotypeAction.LOAD_HAPLOTYPE_SUCESS:
      {

        state.haplotypedata = action.payload;
        return state;
      }
    case HaplotypeAction.LOAD_CHART_DATA:
      {

        return state;

      }

    case HaplotypeAction.LOAD_CHART_DATA_SUCESS:
      {
        state.chartData = action.payload;
        return state;
      }
    case HaplotypeAction.LOAD_DOCUMENT_LIST:
      {

        return state;

      }

    case HaplotypeAction.LOAD_DOCUMENT_LIST_SUCESS: {

      state.documentlist = action.payload;
      return state;
    }
    default: {
      return state;
    }


  }
}
