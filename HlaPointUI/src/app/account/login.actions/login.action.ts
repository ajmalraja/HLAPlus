import { UserCredentials } from '../login.models/user-credentials';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store/src/store';
import { AppState } from '../../models/app-state';
import { UserToken } from '../login.models/user-token';
export const VALIDATE_USER = 'VALIDATE_USER';
export const VALIDATE_USER_SUCESS = 'VALIDATION_SUCESS';
export const VALIDATE_USER_FAILED = 'VALIDATION_FAILED';
export const LOGOUT_CLEAR_STORE = 'LOGOUT_CLEAR_STORE';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export class ValidateUserAction implements Action {

  readonly type = VALIDATE_USER;
  constructor(public payload: UserCredentials) {

  }
}

export class RefreshToken implements Action {

  readonly type = REFRESH_TOKEN;
  constructor(public payload: UserToken) {

  }

}

export class ValidateUserSucessAction implements Action {

  readonly type = VALIDATE_USER_SUCESS;
  constructor(public payload: any) {

  }

}

export class ValidateUserFailedAction implements Action {

  readonly type = VALIDATE_USER_FAILED;
  constructor(public payload: any) {

  }

}
export class LogoutClearState implements Action {
  readonly type = LOGOUT_CLEAR_STORE;
  constructor(public payload: Store<AppState>) {

  }
}
export type Action = ValidateUserAction | ValidateUserSucessAction | ValidateUserFailedAction | LogoutClearState | RefreshToken;
