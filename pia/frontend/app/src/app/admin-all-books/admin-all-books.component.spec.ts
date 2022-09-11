import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllBooksComponent } from './admin-all-books.component';

describe('AdminAllBooksComponent', () => {
  let component: AdminAllBooksComponent;
  let fixture: ComponentFixture<AdminAllBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
