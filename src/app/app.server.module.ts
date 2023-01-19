import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { LottieServerModule } from 'ngx-lottie/server';
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        LottieServerModule.forRoot({
            preloadAnimations: {
                folder: 'dist/waypoint/browser/assets/animations',
                animations: ['aboutUs.json'],
            },
        }),
        InViewportModule.forServer()
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule { }
