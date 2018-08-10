import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {AccountModule} from './account/account.module';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './account/login.components/login.component';
import { LoginService } from './account/login.services/login.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { STORE_DEVTOOLS_CONFIG } from '@ngrx/store-devtools/src/config';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { loginReducer } from './account/login.reducers/login.reducer';
import { LoginEffects } from './account/login.effects/login.effects';
import { HomepageModule } from './homepage/homepage.module';
import { approuter } from './app.router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomePageReducer } from './homepage/homepage.reducers/homepage.reducer';
import {  HaplotypeReducer } from './homepage/homepage.reducers/haplotype.reducer';
import {  PopulationReducer } from './homepage/homepage.reducers/population.reducer';
import { HaplotypeEffects } from './homepage/homepage.effects/haplotype.effects';
import { HaplotypeService } from './homepage/homepage.service/haplotyp-service.service';
import { PopulationEffects } from './homepage/homepage.effects/Population.effects';
import { PopulationService } from './homepage/homepage.service/population-service.service';
import { UserListService} from './account/login.services/userservice.service';
import { UserActionReducer} from './account/login.reducers/user.reducers'
import { UserListEffects  } from './account/login.effects/user.effects'
import { UpdatePopulation } from './homepage/homepage.actions/updatepopulation.action';
import { UpdatePopulationEffects } from './homepage/homepage.effects/updatepopulation.effects';
import { UpdatePopulationReducer } from './homepage/homepage.reducers/updatepopulation.reducer';
import { UpdateHaplotypeReducer } from './homepage/homepage.reducers/updatehaplotype.reducer';
import { UpdateHaplotypeEffects } from './homepage/homepage.effects/updatehaplotype.effect';
import { GridConfigReducer } from './homepage/homepage.reducers/gridconfig.reducer';
import { AdvanceSearchReducer } from './homepage/homepage.reducers/advancedsearch.reducer';
import { AdvanceSearchEffects } from './homepage/homepage.effects/advancesearch.effects';
import { AdvancesearchService } from './homepage/homepage.service/advancesearch.service';
import { GridConfigEffects } from './homepage/homepage.effects/gridconfigeffects';
import { UserprefService } from './homepage/homepage.service/userpref.service';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { AccreditationComponent } from './accreditation/accreditation.component';
import { CustomerErrorHandler} from './customer-error-handler';
import { SystemloggingService } from './systemlogging.service';


@NgModule({
  declarations: [
    AppComponent,AboutComponent, TermsComponent, AccreditationComponent

  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AccountModule,
    approuter,
    HttpClientModule,
    StoreModule.forRoot({userdetials: loginReducer,currentRouteDet:HomePageReducer,
                        Haplotypelist:HaplotypeReducer,Populationlst:PopulationReducer,
                        UserList:UserActionReducer,UpdatedPopulation:UpdatePopulationReducer,
                        UpdatedHaplotype:UpdateHaplotypeReducer,GridColumnDet:GridConfigReducer,
                        AdvanceSearchDet:AdvanceSearchReducer
                      }),
    EffectsModule.forRoot([LoginEffects,HaplotypeEffects,PopulationEffects,
      UserListEffects,UpdatePopulationEffects,UpdateHaplotypeEffects,AdvanceSearchEffects,GridConfigEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    BrowserAnimationsModule
  ],

  providers: [LoginService, HaplotypeService,PopulationService,UserListService,AdvancesearchService,SystemloggingService,
     UserprefService,HttpClient, { provide: ErrorHandler, useClass: CustomerErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
