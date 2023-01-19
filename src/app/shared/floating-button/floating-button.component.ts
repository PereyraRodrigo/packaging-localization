import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

  shakeIt = true;
  active = false;
  isScrolled = false;
  video: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.video = this.getVideoUrl();
  }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event:Event){
      let scrolledSize = document.documentElement.scrollTop;
      if (scrolledSize > 225 ){
        this.isScrolled = true;
      }else{
        this.isScrolled = false;
    }
  }
  getVideoUrl(){
    let videUrl = 'https://www.youtube-nocookie.com/embed/i9WLqdS1F0Q'
    return this.sanitizer.bypassSecurityTrustResourceUrl(videUrl);
  }
}
