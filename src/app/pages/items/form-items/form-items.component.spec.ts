import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemsComponent } from './form-items.component';

describe('FormItemsComponent', () => {
  let component: FormItemsComponent;
  let fixture: ComponentFixture<FormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
