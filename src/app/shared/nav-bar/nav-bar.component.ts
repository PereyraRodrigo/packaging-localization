import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public showSubmenu: boolean = false;
  isScrolled = false;
  showContact: boolean = false;
  open: boolean = false;
  animate: boolean = false;
  animateUnderline: boolean = false;
  imgUrl = environment.IMGURL;

  @ViewChild("navBar") el: ElementRef;
  
  constructor(public router: Router, public navService: NavBarService, public screenSize: ScreenSizeService) { }

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event:Event){
    if (this.el){
      let navBarSize = this.el.nativeElement.offsetHeight;
      let scrolledSize = document.documentElement.scrollTop;
      if (scrolledSize > (navBarSize * 2) ){
        this.isScrolled = true;
      }else{
        this.isScrolled = false;
      }
    }
  }

  
  
  ngOnInit(): void {
    this.showContact = false;
  }

  navigate(category){
      this.router.navigateByUrl(`portfolio/${category}`) 
  }

  closeThis(event){
    let elementsArray = ['full-size-menu']
    let element = event.srcElement.classList[0];
    if (elementsArray.includes(element) ){
      this.open = false;
    }
  }

  closeContact(event){
    if (event.srcElement.id == 'contact-full-size') {
      this.navService.openContact();
  }
  }
}
