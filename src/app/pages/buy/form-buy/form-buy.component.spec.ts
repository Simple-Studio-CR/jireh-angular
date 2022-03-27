import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuyComponent } from './form-buy.component';

describe('FormBuyComponent', () => {
  let component: FormBuyComponent;
  let fixture: ComponentFixture<FormBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
