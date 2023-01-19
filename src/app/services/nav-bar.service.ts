import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  imgUrl = environment.IMGURL;
  isOpenContact = false;
  logoType = 'logo'
  logoImg = `${this.imgUrl}/img/logos/waypoint.svg`;
  logoContent = this.logoImg;
  link = 'https://www.waypoint.la/';
  constructor() { }

  get isOpen(){
    return this.isOpenContact;
  }

  get getLogo(){
    return this.logoImg;
  }

  get getLogoType(){
    return this.logoType;
  }

  get getLogoContent(){
    return this.logoContent;
  }

  get getLogoLink(){
    return this.link;
  }

  openContact(){
    this.isOpenContact = !this.isOpenContact;
    return this.isOpenContact;
  }



  logoChanger(pageCategory?){
    if(pageCategory){
      this.logoType = 'text';
      this.logoContent = pageCategory;
      this.link = `portfolio/${this.logoContent}`;
    }else{
      this.logoType = 'logo';
      this.logoContent = this.logoImg;
      this.link = '/';
    }
  }
}
