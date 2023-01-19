import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLocalizationComponent } from './packaging-localization.component';

describe('PackagingLocalizationComponent', () => {
  let component: PackagingLocalizationComponent;
  let fixture: ComponentFixture<PackagingLocalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLocalizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLocalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
