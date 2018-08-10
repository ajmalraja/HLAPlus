import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule} from '../shared/spinner/spinner.module';
import { SpinnerComponent } from './spinner/spinner.component';
import {ErrorsComponent} from './errors/errors.component';
import {GridcolumnconfigComponent} from './gridcolumnconfig/gridcolumnconfig.component';
import { AdvancesearchComponent } from './advancesearch/advancesearch.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
@NgModule({
  imports: [
    CommonModule, SpinnerModule,FormsModule,ButtonsModule,ReactiveFormsModule,
    DropDownsModule,DateInputsModule,DialogModule
  ],
  declarations: [ErrorsComponent,AdvancesearchComponent,GridcolumnconfigComponent],
  exports:[SpinnerComponent, ErrorsComponent,AdvancesearchComponent,
    GridcolumnconfigComponent]
})
export class SharedModule { }
