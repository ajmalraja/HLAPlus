import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppState } from '../models/app-state';
import { Store } from '@ngrx/store';
import { UserToken } from '../account/login.models/user-token';
import * as HomepageActions from './homepage.actions/homepage.action';
import * as HaplotypeActions from './homepage.actions/haplotype.action';
import * as LoginActions from '../account/login.actions/login.action';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Currentroute } from '../models/currentroute';
import { timer } from 'rxjs/observable/timer';
import { Chartdata } from '../models/chartdata';
import { ICurrentroute } from '../models/Icurrentroute';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userInfo$: Observable<any>;
  routerInfo$: Observable<any>;
  chartData$: Observable<any>;
  public currentrouteDet = new Currentroute();
  public spinnervisibility = false;
  public shouldRun = false;
  public menuchild: Array<boolean> = [];
  public i = 0;
  public sessiondialogOpened = false;
  private logoname = '';
  private bannerdescription = '';
  constructor(private store: Store<AppState>, private router: Router) {



  }
  ngOnInit() {
    this.store.dispatch(new HaplotypeActions.LoadChartData);
    this.spinnervisibility = false;
    this.currentrouteDet.logopath = '../../assets/Images/Home.png';
    this.currentrouteDet.description = 'Home';
    this.menuchild.forEach(element => { element = false; });
//    this.sessionTracker();
    this.MenuNavigation('HomepageChart');
  }


  MenuNavigation(selElement: string) {



    this.logoname = selElement + '.png';
    this.bannerdescription = selElement;

    if (selElement.search('.org') > 0) {
      window.open(selElement);
      return;
    }

    if (selElement == 'HomepageChart') {

      this.logoname = 'Home.png';
      this.bannerdescription = 'Home';
    }



    this.shouldRun = false;
    this.currentrouteDet.path = selElement;
    this.currentrouteDet.logopath = '../../assets/Images/' + this.logoname;
    this.currentrouteDet.description = this.bannerdescription;




    // tslint:disable-next-line:triple-equals
    if (selElement != 'Home') {

      selElement = 'Home/' + selElement;

    } else {

      selElement = 'Home';

    }
    this.ValidateToken(selElement);


  }

  Logout() {

    this.store.dispatch(new LoginActions.LogoutClearState(this.store));
    this.router.navigate(['']);
  }

  ValidateToken(selElement: string) {

    this.userInfo$ = this.store.select(state => state.userdetials.Expires);
    this.userInfo$.subscribe(data => {
      this.currentrouteDet.expdate = data;
      this.store.dispatch(new HomepageActions.ValidateToken(this.currentrouteDet));

    });



    this.routerInfo$ = this.store.select(state => state.currentRouteDet.tokenValidity);

    this.routerInfo$.subscribe(data => {

      if (data) {

        this.currentrouteDet.tokenValidity = data;

        this.store.dispatch(new HomepageActions.ValidateTokenSucessAction(this.currentrouteDet));
        if (selElement == 'Home/HomepageChart') {

          this.checkchartdata();

        } else {
          this.router.navigate([selElement]);
        }
      } else {

        this.currentrouteDet.tokenValidity = data;
        this.store.dispatch(new HomepageActions.ValidateTokenFailedAction(this.currentrouteDet));
        this.router.navigate(['']);


      }

    });
  }
  OnActivate(event) {
    this.routerInfo$ = this.store.select(state => state.currentRouteDet.description);
    this.routerInfo$.subscribe(data => {
      this.currentrouteDet.description = data;
    });
  }

  // Hambugrger Menu Integeration//

  menuopen() {

    // tslint:disable-next-line:triple-equals
    if (this.shouldRun == false) {
      this.shouldRun = true;
    } else {
      this.shouldRun = false;
    }
  }

  submenu(i) {
    // tslint:disable-next-line:triple-equals
    if (this.menuchild[i] == true) {

      this.menuchild[i] = false;
    } else {

      this.menuchild[i] = true;
    }
  }
  sessionTracker() {

    const sessionTimer: Observable<any> = timer(1000, 5000);
    const subscription = sessionTimer.subscribe(val => {
      this.userInfo$ = this.store.select(state => state.userdetials.Expires);
      this.userInfo$.subscribe(data => {

        let expdate = new Date(data);
        expdate.setSeconds(expdate.getSeconds() - 30);
        const curdate = new Date();

        if (expdate <= curdate) {
          this.sessiondialogOpened = true;
          expdate.setSeconds(expdate.getSeconds() + 30);
        }

        this.currentrouteDet.expdate = data;
        this.store.dispatch(new HomepageActions.ValidateToken(this.currentrouteDet));
        this.routerInfo$ = this.store.select(state => state.currentRouteDet.tokenValidity);
        this.routerInfo$.subscribe(data => {

          if (data == false) {

            subscription.unsubscribe();
            this.router.navigate(['']);
            return;

          }
        });

      });


    });


  }


  refreshToken() {

    let userdet$: Observable<any>;

    userdet$ = this.store.select(state => state.userdetials);
    userdet$.subscribe(data => {

      this.store.dispatch(new LoginActions.RefreshToken(data));
      this.sessiondialogOpened = false;
    });

  }

  checkchartdata() {

    this.store.dispatch(new HaplotypeActions.LoadChartData());
    this.chartData$ = this.store.select(store => store.Haplotypelist.chartData);
    this.chartData$.subscribe(data => {
      if (typeof data != 'undefined') {
        if (data.length > 0) {

          this.router.navigate(['Home/HomepageChart']);
        }
      }
    });

  }

}
