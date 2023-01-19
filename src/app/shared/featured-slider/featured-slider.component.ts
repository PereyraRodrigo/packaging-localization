import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';

import createTripleSlider from './triple-slider';


@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
})
export class FeaturedSliderComponent implements OnInit {
  imgUrl = environment.IMGURL;
  public portfolioItems: [];
  public $portfolioItems: Observable<any[]>;
  public numberSlider: 0;

  @ViewChildren('swiperSlide') slides: QueryList<any>;
  constructor(
    private router: Router,
    private wpService: WpDataService,
    public loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {    
    this.getItems();
  }

  ngAfterViewInit() {
    this.slides.changes.subscribe(t => {
      createTripleSlider(document.querySelector('.triple-slider'))
    })
  }

  getItems = async () => {
    this.wpService.getPortfolioItemsHome().subscribe(
      (resp) => {
        this.portfolioItems = resp;
      },
      (err) => {}
    );
  };

  navigate(slug: string, category?){
    this.router.navigateByUrl(`portfolio/${category}/${slug}`); 
  }


}
