import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCategoryComponent } from './portfolio-category.component';

describe('PortfolioCategoryComponent', () => {
  let component: PortfolioCategoryComponent;
  let fixture: ComponentFixture<PortfolioCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
