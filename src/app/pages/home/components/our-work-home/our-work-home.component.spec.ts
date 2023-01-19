import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWorkHomeComponent } from './our-work-home.component';

describe('OurWorkHomeComponent', () => {
  let component: OurWorkHomeComponent;
  let fixture: ComponentFixture<OurWorkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurWorkHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurWorkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
