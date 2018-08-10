import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepopulationComponent } from './updatepopulation.component';

describe('UpdatepopulationComponent', () => {
  let component: UpdatepopulationComponent;
  let fixture: ComponentFixture<UpdatepopulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepopulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
