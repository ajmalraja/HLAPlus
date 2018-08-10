import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcolumnconfigComponent } from './gridcolumnconfig.component';

describe('GridcolumnconfigComponent', () => {
  let component: GridcolumnconfigComponent;
  let fixture: ComponentFixture<GridcolumnconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridcolumnconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridcolumnconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
