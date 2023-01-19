import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderProductHomeComponent } from './slider-product-home.component';

describe('SliderProductHomeComponent', () => {
  let component: SliderProductHomeComponent;
  let fixture: ComponentFixture<SliderProductHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderProductHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
