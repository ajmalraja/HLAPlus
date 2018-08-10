import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent  {


@ViewChild('overLay') el: ElementRef;


@Input()
set visibility(val: boolean)
{

if  (val) {

  this.el.nativeElement.style.display = 'block';


} else {


  this.el.nativeElement.style.display = 'none';


}

}

}
