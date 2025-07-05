import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashierPosPage } from './cashier-pos.page';

describe('CashierPosPage', () => {
  let component: CashierPosPage;
  let fixture: ComponentFixture<CashierPosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
