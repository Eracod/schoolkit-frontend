import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipGridComponent } from './chip-grid.component';

describe('ChipGridComponent', () => {
  let component: ChipGridComponent;
  let fixture: ComponentFixture<ChipGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
