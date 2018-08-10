import { UserToken } from '../login.models/user-token';

import * as loginActions from '../login.actions/login.action';
import { UserCredentials } from '../login.models/user-credentials';
import { State } from '@ngrx/store/src/state';
import { AppState } from '../../models/app-state';


const usertoken: UserToken = new UserToken();
export function loginReducer(state = usertoken, action: loginActions.Action) {

  switch (action.type) {

    case loginActions.VALIDATE_USER: {

      const logindet = action.payload;
      return state;
    }

    case loginActions.REFRESH_TOKEN: {

      const logindet = action.payload;
      return state;
    }

    case loginActions.VALIDATE_USER_SUCESS: {

      state.Access_token = action.payload.access_token;
      state.Refresh_token = action.payload.refresh_token;
      const dt = new Date();
      dt.setSeconds(dt.getSeconds() + action.payload.expires_in);
      state.Expires = dt;
      state.UserName = action.payload.userName;
      return state;

    }
    case loginActions.VALIDATE_USER_FAILED: {


      state.Error=action.payload.error.error_description;
      state.Errordesc = action.payload.message;
      return state;

    }
    case loginActions.LOGOUT_CLEAR_STORE: {

      state.Access_token = null;
      state.UserName = null;
      state.Expires = null;
      return state;
    }
    default: {
      return state;
    }
  }

}
