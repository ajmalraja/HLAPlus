import { Action } from '@ngrx/store';

export const SET_GRIDCOLUMNS='SET_GRIDCOLUMNS'
export const GET_GRIDCOLUMNS = 'GET_GRIDCOLUMNS';
export const SET_GRIDCOLUMNS_WIDTH='SET_GRIDCOLUMNS_WIDTH';
export const GET_GRIDCOLUMNS_SUCESS='GET_GRIDCOLUMNS_SUCESS';
export const SAVE_GRIDCOLUMNS_SUCESS='SAVE_GRIDCOLUMNS_SUCESS';
export const GRIDCOLUMNS_PROCESS_ONERROR='GRIDCOLUMNS_PROCESS_ONERROR';
export class SetGridColumns implements Action {

 readonly type= SET_GRIDCOLUMNS;

 constructor(public payload: any) {

}
}


export class GetGridColumns implements Action {

  readonly type= GET_GRIDCOLUMNS;

 constructor(public payload: any) {

 }

 }
 export class SetGridColumnsWidth implements Action {

  readonly type=SET_GRIDCOLUMNS_WIDTH;

 constructor(public payload: any) {

 }

 }

 export class GetUserPreferenceSucess implements Action {

 readonly type=GET_GRIDCOLUMNS_SUCESS;

 constructor(public payload: any) {

}
 }

 export class SaveUserPreferenceSucess implements Action {

  readonly type=SAVE_GRIDCOLUMNS_SUCESS;

  constructor(public payload: any) {

 }
  }

  export class OnError implements Action {

    readonly type=GRIDCOLUMNS_PROCESS_ONERROR;

    constructor(public payload: any) {

   }
    }
export type Action = SetGridColumns|GetGridColumns|SetGridColumnsWidth|GetUserPreferenceSucess|SaveUserPreferenceSucess|OnError;
