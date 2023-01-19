import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeroGridComponent } from './hero-grid/hero-grid.component';
import { BlogAsideComponent } from './blog-aside/blog-aside.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { AnimationsComponent } from './animations/animations.component';
import { LottieModule } from 'ngx-lottie';
import { LoaderComponent } from './loader/loader.component';
import { ClientsLogosComponent } from './clients-logos/clients-logos.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PongComponent } from './pong/pong.component';
import { GameComponent } from './pong/game/game.component';
import { AnimatedArrowComponent } from './animated-arrow/animated-arrow.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SocialShareButtonsComponent } from './social-share-buttons/social-share-buttons.component';
import { ShopifyProductsComponent } from './shopify-products/shopify-products.component';
import { FeaturedSliderComponent } from './featured-slider/featured-slider.component';
import { RelatedPostsSliderComponent } from './related-posts-slider/related-posts-slider.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [    
    NavBarComponent,
    FooterComponent,
    HeroGridComponent,
    BlogAsideComponent,
    ContactFormComponent,
    FloatingButtonComponent,
    AnimationsComponent,
    LoaderComponent,
    ClientsLogosComponent,
    GameComponent,
    PongComponent,
    AnimatedArrowComponent,
    SocialShareButtonsComponent,
    ShopifyProductsComponent,
    FeaturedSliderComponent,
    RelatedPostsSliderComponent,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    ShareModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    LottieModule.forRoot({ player: playerFactory }),
    RouterModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    HeroGridComponent,
    BlogAsideComponent,
    FloatingButtonComponent,
    AnimationsComponent,
    LoaderComponent,
    ClientsLogosComponent,
    GameComponent,
    ShopifyProductsComponent,
    FeaturedSliderComponent
  ]
})
export class SharedModule { }
