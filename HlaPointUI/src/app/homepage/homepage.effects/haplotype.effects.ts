import { Injectable } from '@angular/core';
import { HaplotypeService } from '../homepage.service/haplotyp-service.service';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as HaplotypeActions from '../homepage.actions/haplotype.action';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivationStart } from '@angular/router/src/events';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()

export class HaplotypeEffects{


  constructor(
    private haplotypeservice:HaplotypeService,
    private action$: Actions
  )  {


  }

@Effect()
haplotypelst$:Observable<Action>=this.action$
.ofType(HaplotypeActions.LOAD_HAPLOTYPE)
.switchMap((payload) => this.haplotypeservice.LoadHaplotypeService()
.map(data =>(new HaplotypeActions.LoadHaplotypeSucess(data) ))
);

@Effect()
chartData$:Observable<Action>=this.action$
.ofType(HaplotypeActions.LOAD_CHART_DATA)
.switchMap((payload) => this.haplotypeservice.LoadCharDataService()
.map(data =>(new HaplotypeActions.LoadChartDataSucess(data) ))
);

@Effect()
Documentlist$:Observable<Action>=this.action$
.ofType(HaplotypeActions.LOAD_DOCUMENT_LIST)
.switchMap((payload) => this.haplotypeservice.LoadDocumentList()
.map(data =>(new HaplotypeActions.LoadDocumentSucess(data) ))
);






}
