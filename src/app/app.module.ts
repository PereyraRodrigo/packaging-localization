import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SlugPipe } from './pipes/slug.pipe';

import { InViewportModule } from '@thisissoon/angular-inviewport';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    SlugPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SlickCarouselModule,
    BrowserTransferStateModule,
    InViewportModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [
    SlugPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
