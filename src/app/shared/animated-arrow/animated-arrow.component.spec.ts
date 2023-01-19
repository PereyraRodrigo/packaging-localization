import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedArrowComponent } from './animated-arrow.component';

describe('AnimatedArrowComponent', () => {
  let component: AnimatedArrowComponent;
  let fixture: ComponentFixture<AnimatedArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
