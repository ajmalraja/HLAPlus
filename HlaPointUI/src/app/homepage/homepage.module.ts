import { NgModule,ErrorHandler  } from '@angular/core';
import { CommonModule } from "@angular/common";
import { homepageRouter } from "./homepage.route";
import { HomepageComponent } from "./homepage.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccountModule } from "../account/account.module";

import { MatButtonModule, MatMenuModule,MatSidenavModule,MatCardModule } from "@angular/material";
import { MessageComponent } from "./message/message.component";
import { HaplotypeComponent } from "./haplotype/haplotype.component";
import { PopulationComponent } from "./population/population.component";

import { SharedModule } from "../shared/shared.module";
import { ExcelExportModule } from "@progress/kendo-angular-excel-export";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { GridModule } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UserComponent } from "../account/user/user.component";
import { UpdatepopulationComponent } from "./updatepopulation/updatepopulation.component";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ErrorsComponent } from "../shared/errors/errors.component";
import { UpdateHaplotypeComponent } from "./update-haplotype/update-haplotype.component";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { GridcolumnconfigComponent } from "../shared/gridcolumnconfig/gridcolumnconfig.component";
import { AdvancesearchComponent } from "../shared/advancesearch/advancesearch.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerErrorHandler } from '../customer-error-handler';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { HaplotypechartComponent } from './haplotypechart/haplotypechart.component';
import { AttachmentComponent } from './documents/attachment.component';
import { UploadModule } from '@progress/kendo-angular-upload';


@NgModule({
  imports: [
    CommonModule,
    homepageRouter,
    NgbModule,
    MatButtonModule,
    MatMenuModule,
    GridModule,
    SharedModule,
    ExcelExportModule,
    PDFExportModule,
    AccountModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    DialogModule,
    MatCardModule,
    MatSidenavModule,
    ChartsModule,
    UploadModule
  ],
  providers: [  { provide: ErrorHandler, useClass: CustomerErrorHandler }],
  declarations: [
    HomepageComponent,
    MessageComponent,
    HaplotypeComponent,
    PopulationComponent,
    UserComponent,
    UpdatepopulationComponent,
    UpdateHaplotypeComponent,
    HaplotypechartComponent,
    AttachmentComponent,

  ]
})
export class HomepageModule {}
