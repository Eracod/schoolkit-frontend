import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPinCodeComponent } from './form-pin-code.component';

describe('FormPinCodeComponent', () => {
  let component: FormPinCodeComponent;
  let fixture: ComponentFixture<FormPinCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPinCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
