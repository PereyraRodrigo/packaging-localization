import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-animated-arrow',
  templateUrl: './animated-arrow.component.html',
  styleUrls: ['./animated-arrow.component.scss']
})
export class AnimatedArrowComponent implements OnInit {
  imgUrl = environment.IMGURL;
  isScrolled: boolean = false;
  
  @ViewChild("navBar") el: ElementRef;
  
  constructor() { }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event:Event){
    let scrolledSize = document.documentElement.scrollTop;
    if (scrolledSize >= 300){
      this.isScrolled = true;
    }else{
      this.isScrolled = false;
    }
  }

  ngOnInit(): void { }

}
