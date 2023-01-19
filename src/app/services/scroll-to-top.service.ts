import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {

  constructor(private router: Router) { }

  scrollToTop() {
    this.router.events.subscribe((event: NavigationEnd) => {
      try {
        window.scroll(0, 0);
      }
      catch (ex) {

      }
    });
  }

}
