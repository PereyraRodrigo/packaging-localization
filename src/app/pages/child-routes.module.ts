import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioCategoryComponent } from './portfolio-category/portfolio-category.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { CareerComponent } from './career/career.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { FeaturedSliderComponent } from '../shared/featured-slider/featured-slider.component';

const childRoutes:  Routes = [      
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:category', component: BlogComponent },
  { path: 'blog/:category/:post', component: BlogDetailComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/:type', component: PortfolioCategoryComponent },
  { path: 'portfolio/:type/:item', component: PortfolioDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'careers', component: CareerComponent },
  { path: 'careers/:item', component: CareerDetailComponent },
  { path: 'slider', component: FeaturedSliderComponent }

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
