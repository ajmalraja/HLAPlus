import { Action } from '@ngrx/store';


export const UPDATE_POPULATION ='UPDATE_POPULATION'
export const UPDATE_POPULATION_SUCESS ='UPDATE_POPULATION_SUCESS'



 export class UpdatePopulation implements Action {

  readonly type= UPDATE_POPULATION;

  constructor (public payload: any) {

  }


 }

 export class UpdatePopulationSucess implements Action {

  readonly type= UPDATE_POPULATION_SUCESS;

  constructor (public payload: any) {

  }


 }


export type Action = |UpdatePopulation|UpdatePopulationSucess;
