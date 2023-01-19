import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsHomeComponent } from './components/about-us-home/about-us-home.component';
import { SliderProductHomeComponent } from './components/slider-product-home/slider-product-home.component';
import { OurWorkHomeComponent } from './components/our-work-home/our-work-home.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { ClientsComponent } from './components/clients/clients.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormComponent } from './components/form/form.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { PackagingLocalizationComponent } from './components/packaging-localization/packaging-localization.component';
import { OurWorkComponent } from './components/our-work/our-work.component';




@NgModule({
  declarations: [
    HomeComponent,
    AboutUsHomeComponent,
    SliderProductHomeComponent,
    OurWorkHomeComponent,
    BlogHomeComponent,
    ContactHomeComponent,
    ClientsComponent,
    HeroComponent,
    FormComponent,
    OurClientsComponent,
    PackagingLocalizationComponent,
    OurWorkComponent
  ],
  imports: [
    CommonModule,
    InViewportModule,
    SharedModule,
    RouterModule,
    SlickCarouselModule
  ],
  exports: [
    HomeComponent,
    AboutUsHomeComponent,
    SliderProductHomeComponent,
    OurWorkHomeComponent,
    BlogHomeComponent,
    ContactHomeComponent,
    ClientsComponent
  ]
})
export class HomeModule { }
