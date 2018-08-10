import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaplotypeComponent } from './haplotype.component';

describe('HaplotypeComponent', () => {
  let component: HaplotypeComponent;
  let fixture: ComponentFixture<HaplotypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaplotypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaplotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
