import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'slider-product-home',
  templateUrl: './slider-product-home.component.html',
  styleUrls: ['./slider-product-home.component.scss']
})
export class SliderProductHomeComponent implements OnInit {
  public mouseDown = false;
  isVisible = false;
  page;
  imgUrl = environment.IMGURL;
  currentSlide = 0;
  loading = true;
  loadedPerc = 1;
  navSize = '10%';

  productSlider = {
    "slidesToShow": 1, 
    "centerMode": false,
    "arrows": false,
    "infinite": true,
    "mobileFirst": true,
    "draggable": false,
    "focusOnSelect": true,
    "swipeToSlide": true,
    "useTransform": true,
    "touchThreshold": 10,
    "pauseOnFocus": false,
    "speed": 750,
    "responsive": [
      {
        "breakpoint": 2499,
        "settings": {
          "slidesToShow": 3,
          "centerPadding": '0px',
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
        }
      },
      {
        "breakpoint": 2159,
        "settings": {
          "slidesToShow": 1,
          "centerPadding": '580px',
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
          
        }
      },
      {
        "breakpoint": 1800,
        "settings": {
          "slidesToShow": 1,
          "centerPadding": '520px',
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
          
        }
      },
      {
        "breakpoint": 1420,
        "settings": {
          "slidesToShow": 1,
          "centerPadding": '420px',
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
          
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "centerPadding": '320px',
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "centerMode": true,
          "infinite": true,
          "draggable": true,
          "focusOnSelect": true,
          "swipeToSlide": true,
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "centerMode": false
        },
        
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  public portfolioItems: [] = [];

  constructor(private router: Router, 
    private wpService: WpDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItems();
  
  }

  getItems = async() =>{
    this.loading = true;
    await this.wpService.getPortfolioItemsHome()
    .subscribe( resp => {
      this.portfolioItems = resp;
      if (this.portfolioItems.length > 0){
        this.loading = false;
      }
    }, (err) => {
    })
  }
  
  navigate(slug: string, category?){
    this.router.navigateByUrl(`portfolio/${category}/${slug}`);
  }

trackMouse() {
  this.mouseDown = true;

  try {
    window.setTimeout(() => {
        this.mouseDown = false;
      }, 200);
  }
    catch (ex) { }
  }

navigateIfClick(slug: string, category?) {
  if (this.mouseDown) {
    this.router.navigateByUrl(`portfolio/${category}/${slug}`);
  }
}

onInViewportChange(inViewport: boolean){
  if (inViewport == true){
    this.isVisible = true;
  }
}

afterChange(event){
  let current = event.nextSlide;
  this.currentSlide = current;
  this.navSize = (this.currentSlide + 1)*10 + '%';
}

imageLoaded(e){
  let image = e.target;
  image.classList.add('fadeIn')
}
}