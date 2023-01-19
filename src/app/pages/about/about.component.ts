import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
import { producersList } from '../../helper/producers'
import { testimonialsList } from '../../helper/testimonials'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  imgUrl = environment.IMGURL;
  testimonials = [];
  producers = [];
  sliderConfig = {
    "slidesToShow": 1, 
    "centerMode": false,
    "arrows": true,
    "infinite": false,
    "mobileFirst": true,
    "draggable": true,
    "swipeToSlide": true,
    "autoplay": true,
    "autoplaySpeed": 3000
  }
  constructor( private titleService: Title,
               private metaTagService: Meta, 
               public loadingService: LoadingService) { 
                this.updateTags()
               }

  ngOnInit(): void {
    this.getProducers();
    this.getTestimonials();
    this.loadingService.loadedState(true);

  }

  updateTags(){
    let thumb = `${this.imgUrl}/img/seo/waypoint.jpg`
    let description = 'A little over 10 years ago WAYPOINT started offering creative services with a smile to the game industry.';
    this.titleService.setTitle(`WAYPOINT | About Us`);
    this.metaTagService.updateTag({ 
      name: 'description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:text:title', 
      content: `WAYPOINT | About Us` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:title', 
      content: `WAYPOINT | About Us` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:image', 
      content: `${thumb}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:image', 
      content: `${thumb}` 
    })
  }

  getProducers(){
    this.producers = producersList.producers;
  }

  getTestimonials(){
    this.testimonials = testimonialsList.testimonials;

  }

  goTo(link: string) {
    window.open(link, '_blank');
  }
  imageLoaded(e){
    let image = e.target;
    image.classList.add('fadeIn')
  }
}
