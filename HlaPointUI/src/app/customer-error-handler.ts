import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { detect } from 'detect-browser';
import { Store } from '@ngrx/store';
import { AppState } from './models/app-state';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Errordetails } from './models/errordetails';
import { SystemloggingService } from './systemlogging.service';

@Injectable()
export class CustomerErrorHandler implements ErrorHandler {

  private router;
  private injector: Injector;
  private urlinfo;
  private errpostingservice;

  constructor(private store: Store<AppState>, injector: Injector) {

    this.injector = injector;

  }

  handleError(error) {
   /*let resinfo$: Observable<any>;
    const browser = detect();
    this.urlinfo = this.injector.get(DOCUMENT);
    this.errpostingservice = this.injector.get(SystemloggingService)
    const errinfo = this.geterrordetails(error);
    resinfo$ = this.errpostingservice.postErrorMessage(errinfo);
    resinfo$.subscribe(data => {

    });*/

    throw new Error(error);

  }


  geterrordetails(error) {
    const browser = detect();
    let userInfo$: Observable<any>;
    let errorstr = 'BrowserName:' + browser.name + ';BrowserVersion:' + browser.version + ';OperatingSystem:' + browser.os + ';  Error:';
    const errdet = new Errordetails();

    errdet.enteredDate = new Date();
    errdet.logRouteInfo = this.urlinfo.location.href;

    userInfo$ = this.store.select(store => store.userdetials);
    userInfo$.subscribe(data => {

      if (typeof data.UserName != 'undefined') {

        errdet.loguserName = data.UserName;
      }

      if (typeof data.Errordesc != 'undefined') {

        errorstr = data.Error + '; ' + data.Errordesc;

      }
    });
    errdet.logMessage = errorstr + ' ' + error.stack ;
    return errdet;
  }

}



