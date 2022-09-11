import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcceptingComponent } from './admin-accepting.component';

describe('AdminAcceptingComponent', () => {
  let component: AdminAcceptingComponent;
  let fixture: ComponentFixture<AdminAcceptingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAcceptingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAcceptingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
