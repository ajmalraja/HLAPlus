import {Action} from '@ngrx/store'


export const SAVE_QUERY='SAVE_QUERY'
export const GET_SAVED_QUERY='GET_SAVED_QUERY'
export const GET_SAVED_QUERY_SUCESS='GET_SAVED_QUERY_SUCESS'
export const SAVE_QUERY_SUCESS='SAVE_QUERY_SUCESS'


 export class SaveQuery implements Action {

  readonly type= SAVE_QUERY;

 constructor(public payload: any) {

 }
 }
 export class GetSavedQuery implements Action {

  readonly type= GET_SAVED_QUERY;

 constructor(public payload: any) {

 }
 }
 export class GetSavedQuerySucess implements Action {

  readonly type= GET_SAVED_QUERY_SUCESS;

 constructor(public payload: any) {

 }
 }
 export class SaveQuerySucess implements Action {

  readonly type= SAVE_QUERY_SUCESS;

 constructor(public payload: any) {

 }
 }

 export type Action = SaveQuery|GetSavedQuery|GetSavedQuerySucess|SaveQuerySucess;
