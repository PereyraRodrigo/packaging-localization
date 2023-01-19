import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'about-us-home',
  templateUrl: './about-us-home.component.html',
  styleUrls: ['./about-us-home.component.scss']
})
export class AboutUsHomeComponent implements OnInit {
  imgUrl = environment.IMGURL;
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }


  onInViewportChange(inViewport: boolean) {
    if (inViewport == true){
      this.isVisible = true;
    }
  }
}
