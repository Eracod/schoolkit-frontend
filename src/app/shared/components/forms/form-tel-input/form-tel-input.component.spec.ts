import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelInputComponent } from './form-tel-input.component';

describe('FormTelInputComponent', () => {
  let component: FormTelInputComponent;
  let fixture: ComponentFixture<FormTelInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormTelInputComponent]
    });
    fixture = TestBed.createComponent(FormTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
