import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  slides = [
    {
      img: '../../../../../assets/img/portfolio-items/oris.jpg',
      link: 'https://www.waypoint.la/portfolio/creative/ori-the-collection-packaging-and-localization'  },
    {
      img: '../../../../../assets/img/portfolio-items/slime-rancher.jpg',
      link: 'https://www.waypoint.la/portfolio/creative/slime-rancher-packaging-design'  },
    { img: '../../../../../assets/img/portfolio-items/goose.png',
    link: 'https://www.waypoint.la/portfolio/creative/untitled-goose-game-packaging-design-and-localization'   },
    { img: '../../../../../assets/img/portfolio-items/deaths-gambit.jpg',
    link: 'https://www.waypoint.la/portfolio/creative/deaths-gambit-ps4-retail-box-art'   },
    { img: '../../../../../assets/img/portfolio-items/disco-elysium.png',
    link: 'https://www.waypoint.la/portfolio/creative/disco-elysium-packaging-and-loc'   },
    { img: '../../../../../assets/img/portfolio-items/dnd.png',
    link: 'https://www.waypoint.la/portfolio/creative/dd-key-art-and-packaging'   },
  ];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll:1
        }
      },
      {
        breakpoint: 814,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  /* slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  } */
  constructor() {}
  ngOnInit(): void {}
}
