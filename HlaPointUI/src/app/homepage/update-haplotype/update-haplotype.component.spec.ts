import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHaplotypeComponent } from './update-haplotype.component';

describe('UpdateHaplotypeComponent', () => {
  let component: UpdateHaplotypeComponent;
  let fixture: ComponentFixture<UpdateHaplotypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHaplotypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHaplotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
