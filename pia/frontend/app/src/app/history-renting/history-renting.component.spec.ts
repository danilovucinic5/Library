import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRentingComponent } from './history-renting.component';

describe('HistoryRentingComponent', () => {
  let component: HistoryRentingComponent;
  let fixture: ComponentFixture<HistoryRentingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRentingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
