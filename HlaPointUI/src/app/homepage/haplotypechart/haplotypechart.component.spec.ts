import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaplotypechartComponent } from './haplotypechart.component';

describe('HaplotypechartComponent', () => {
  let component: HaplotypechartComponent;
  let fixture: ComponentFixture<HaplotypechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaplotypechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaplotypechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
