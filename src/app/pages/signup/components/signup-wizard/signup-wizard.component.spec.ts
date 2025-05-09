import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWizardComponent } from './signup-wizard.component';

describe('SignupWizardComponent', () => {
  let component: SignupWizardComponent;
  let fixture: ComponentFixture<SignupWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
