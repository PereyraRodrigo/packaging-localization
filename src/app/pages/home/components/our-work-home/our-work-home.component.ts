import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'our-work-home',
  templateUrl: './our-work-home.component.html',
  styleUrls: ['./our-work-home.component.scss']
})
export class OurWorkHomeComponent implements OnInit {
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
