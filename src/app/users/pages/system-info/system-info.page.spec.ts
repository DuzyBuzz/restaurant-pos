import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemInfoPage } from './system-info.page';

describe('SystemInfoPage', () => {
  let component: SystemInfoPage;
  let fixture: ComponentFixture<SystemInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
