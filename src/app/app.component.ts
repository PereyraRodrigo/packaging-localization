import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID,  } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


/* declare const gtag: Function; */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'Waypoint';

  sendEvent = () => {
    (<any>window).ga('send', 'event', {
      eventCategory: 'eventCategory',
      eventLabel: 'eventLabel',
      eventAction: 'eventAction',
      eventValue: 10
    });
  }

  constructor(
    private router: Router,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if(isPlatformBrowser(this.platformId)){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
         /* gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects
         }) */
      })

    }
  }


  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'author', content: 'WAYPOINT' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]);
  }

}
