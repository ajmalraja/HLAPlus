import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.components/login.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ExcelExportModule,
    PDFExportModule,
    GridModule
  ],
  declarations: [LoginComponent],

  exports: [ FormsModule, LoginComponent ],


})

export class AccountModule {



 }
