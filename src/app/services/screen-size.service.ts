import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  mobile = false;

  constructor() { }

  get isMobile() {
    return this.mobile;
  }

  getScreenSize() {

    // TODO SSR does NOT have access to DOM api,
    // configure platform-server to pass user-agent header
    try {

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      } else {
        this.mobile = false;
        return false;
      }
    }
    catch (ex) { }

    return false;
  }

}
