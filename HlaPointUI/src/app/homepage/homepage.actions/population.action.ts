import { Action } from '@ngrx/store';

export const LOAD_POPULATION = ' LOAD_POPULATION';
export const LOAD_POPULATION_SUCESS = 'LOAD_POPULATION_SUCESS';
export const LOAD_POPULATION_FAILED = 'LOAD_POPULATION_FAILED';
export const SUBMIT_POPULATION_QUERY = 'SUBMIT_POPULATION_QUERY';


export class LoadPopulation implements Action {

 readonly type= LOAD_POPULATION;

constructor() {

}

}


export class LoadPopulationSucess implements Action {

  readonly type= LOAD_POPULATION_SUCESS;

 constructor(public payload: any) {

 }

 }

 export class SubmitPopulationQuery implements Action {

  readonly type= SUBMIT_POPULATION_QUERY;

 constructor(public payload: any) {

 }
 }

export class LoadPopulationFailed implements Action {

  readonly type= LOAD_POPULATION_FAILED;

 constructor(public payload: any) {

 }
 }






export type Action = LoadPopulation|LoadPopulationSucess|SubmitPopulationQuery|LoadPopulationFailed;
