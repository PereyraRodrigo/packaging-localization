import { Component, Input, OnInit } from '@angular/core';
import { clientsLogos } from '../../helper/clients-logos';

@Component({
  selector: 'clients-logos',
  templateUrl: './clients-logos.component.html',
  styleUrls: ['./clients-logos.component.scss']
})
export class ClientsLogosComponent implements OnInit {

  @Input() inViewPort: boolean = false;
  @Input() comingFrom: string;
  public clientsLogos = [];

  logosSlider = {
    "slidesToShow": 2, 
    "slidesToScroll": 1,
    "centerMode": false,
    "autoplay": true,
    "speed": 10000,
    "autoplaySpeed": 0,
    "cssEase": 'linear',
    "arrows": false,
    "infinite": true,
    "mobileFirst": true,
    "draggable": true,
    "swipeToSlide": true,
    "responsive": [
      {
        "breakpoint": 1420,
        "settings": {
          "slidesToShow": 6,
          "centerMode": false,
          "draggable": true,
          "autoplay": true,
          "swipeToSlide": true,          
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 6,
          "centerMode": false,
          "autoplay": true,
          "draggable": true,
          "swipeToSlide": true,
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 4,
          "centerMode": false,
          "draggable": true,    
          "autoplay": true,
          "swipeToSlide": true,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 4,
          "autoplay": true,
          "centerMode": false
        },
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.getLogos();
  }

  getLogos(){
    this.clientsLogos = clientsLogos.items;
  }
}
