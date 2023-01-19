import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPostsSliderComponent } from './related-posts-slider.component';

describe('RelatedPostsSliderComponent', () => {
  let component: RelatedPostsSliderComponent;
  let fixture: ComponentFixture<RelatedPostsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedPostsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPostsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
