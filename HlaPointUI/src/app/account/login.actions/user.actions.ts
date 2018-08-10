import { Action } from '@ngrx/store';

export const LOAD_USERLIST = ' LOAD_USERLIST';
export const LOAD_USERLIST_SUCESS = 'LOAD_USERLIST_SUCESS';

export class LoadUserList implements Action {

 readonly type= LOAD_USERLIST

constructor() {

}

}


export class LoadUserListSucess implements Action {

  readonly type= LOAD_USERLIST_SUCESS

 constructor(public payload: any) {

 }

 }



export type Action = LoadUserList|LoadUserListSucess;
