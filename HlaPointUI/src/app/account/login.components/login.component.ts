import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from '../login.models/user-credentials';
import { AppState } from '../../models/app-state';
import * as loginActions from '../login.actions/login.action';
import { Store } from '@ngrx/store';
import { UserToken } from '../login.models/user-token';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

import { Router } from '@angular/router';
import { CustomerErrorHandler } from '../../customer-error-handler';

@Component({
  selector: 'app-acct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userInfo$: Observable<any>;
  errorInfo$: Observable<any>;
  public logindet: UserCredentials = new UserCredentials();
  public usertoken: UserToken = new UserToken();
  public errordesc: string;

  public loginspinnervisibility= false;
  constructor(private store: Store<AppState>, private router: Router) {


  }
  ngInit() {

    this.loginspinnervisibility = true;
  }

  clearHistory() {

    this.errordesc = '';
  }
  onSubmit() {
    this.errordesc = '';
      this.loginspinnervisibility = true;

      this.store.dispatch(new loginActions.ValidateUserAction(this.logindet));

      this.userInfo$ = this.store.select(state => state.userdetials.Access_token);
      this.userInfo$.subscribe(data => {



        if ((data != null) && (typeof data != 'undefined')) {

          this.errordesc = '';
          this.router.navigate(['/Home']);

        }


      });

      this.errorInfo$ = this.store.select(state => state.userdetials.Error);
      this.errorInfo$.subscribe(data => {




        if ((data != null) || (typeof data != 'undefined')) {
          this.errordesc = data;
          this.loginspinnervisibility = false;


        }


      });


  }




}

