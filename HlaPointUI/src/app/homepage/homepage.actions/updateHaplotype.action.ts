import { Action } from '@ngrx/store';


export const UPDATE_HAPLOTYPE = 'UPDATE_HAPLOTYPE';
export const UPDATE_HAPLOTYPE_SUCESS = 'UPDATE_HAPLOTYPE_SUCESS';



 export class UpdateHaplotype implements Action {

  readonly type= UPDATE_HAPLOTYPE;

  constructor (public payload: any) {

  }


 }

 export class UpdateHaplotypeSucess implements Action {

  readonly type= UPDATE_HAPLOTYPE_SUCESS;

  constructor (public payload: any) {

  }


 }


export type Action = UpdateHaplotype|UpdateHaplotypeSucess;
