import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';
import { PagesComponent } from './pages.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { PortfolioCategoryComponent } from './portfolio-category/portfolio-category.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AboutComponent } from './about/about.component';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { CareerComponent } from './career/career.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    PagesComponent,
    PortfolioComponent,
    PortfolioDetailComponent,
    PortfolioCategoryComponent,
    BlogComponent,
    BlogDetailComponent,
    AboutComponent,
    CareerComponent,
    CareerDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InViewportModule,
    SlickCarouselModule,
    SharedModule,
    RouterModule,
    HomeModule,    
    InfiniteScrollModule
  ],
  exports: [
    PagesComponent,
    PortfolioComponent,
    PortfolioDetailComponent,
    PortfolioCategoryComponent,
    BlogComponent
  ]
})
export class PagesModule { }
