import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyProductsComponent } from './shopify-products.component';

describe('ShopifyProductsComponent', () => {
  let component: ShopifyProductsComponent;
  let fixture: ComponentFixture<ShopifyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
