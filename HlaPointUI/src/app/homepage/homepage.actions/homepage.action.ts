
import { UserToken } from '../../account/login.models/user-token';
import { Action } from '@ngrx/store';
import { ICurrentroute } from '../../models/Icurrentroute';
import { Store } from '@ngrx/store/src/store';
import { AppState } from '../../models/app-state';

export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const  TOKEN_VALIDATION_SUCESS = 'TOKEN_VALIDATION_SUCESS';
export const TOKEN_VALIDATION_FAILED = 'TOKEN_VALIDATION_FAILED';



export class ValidateToken implements Action {

    readonly type = VALIDATE_TOKEN;
    constructor( public payload:ICurrentroute) {


    }
}

export class ValidateTokenSucessAction implements Action {

    readonly type = TOKEN_VALIDATION_SUCESS ;
    constructor(public payload: ICurrentroute ) {

    }

}

export class ValidateTokenFailedAction implements Action {

  readonly type = TOKEN_VALIDATION_FAILED ;
  constructor(public payload: ICurrentroute ) {

  }
}






export type Action = ValidateToken| ValidateTokenSucessAction|ValidateTokenFailedAction;
