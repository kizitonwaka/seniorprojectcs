import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatorChartComponent } from './estimator-chart.component';

describe('EstimatorChartComponent', () => {
  let component: EstimatorChartComponent;
  let fixture: ComponentFixture<EstimatorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
