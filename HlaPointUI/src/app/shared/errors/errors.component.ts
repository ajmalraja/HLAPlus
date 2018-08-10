import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'errors',
  template: `

    <ul *ngIf="showErrors()">


      <li style="color: red" *ngFor="let error of errors()">{{error}}</li>


    </ul>


  `, // Defining template how error shown for form element.


})


export class ErrorsComponent  {

private static readonly messages={

  'required': () => 'Required' ,
 'maxlength': () => 'Exceeded the Maxmium Length'
};

@Input()
private control: AbstractControlDirective | AbstractControl;
@Input()
private errormsg:string;

showErrors(): boolean {


  return this.control &&


    this.control.errors &&


    (this.control.dirty || this.control.touched);


}

errors(): string[] {


  return Object.keys(this.control.errors)


    .map(field => this.getMessage(field, this.control.errors[field]));


}

private getMessage(type: string, params: any) {



  let msg:string = this.errormsg  + ' ' + ErrorsComponent.messages[type](params);

  return msg;


}

}
