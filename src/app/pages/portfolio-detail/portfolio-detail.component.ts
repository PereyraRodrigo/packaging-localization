import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Title, Meta } from '@angular/platform-browser';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss'],
})
export class PortfolioDetailComponent implements OnInit {

  imgUrl = environment.IMGURL;
  
  public fontSize: string = "3rem";
  public currentSlide = 0;
  public post;
  public postContent;
  public nextPost;
  public postVideo;
  public videoSecureUrl;
  public loading = true;
  public slidesAmount: number;
  public gallerySectionWidth: number = 1500;
  type: string;
  public showOverlayGallery = false;
  public mouseDown: boolean = true;
  isScrolled = false;
  @ViewChild("heroImage") el: ElementRef;
  overlaySlideConfig;
  productSlider;

  public titleForTag: string;


  slides = [];

  @Output() loaded = new EventEmitter();

  @HostListener('load')
  onLoad() {
    this.loaded.emit();
  }

  constructor(private router: Router, 
    private wpService: WpDataService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta, 
    private sanitizer: DomSanitizer, 
    private navBar: NavBarService,
    private location: Location,
    private elRef: ElementRef<HTMLImageElement>) { 
      if (this.elRef.nativeElement.complete) {
        this.loaded.emit();
      }
    }



  ngOnInit(): void {
    let portfolioItemSlug = this.route.snapshot.paramMap.get('item');
    this.getPortfolioItemBySlug(portfolioItemSlug);
    
  }

  getPortfolioItemBySlug = async(slug) => {
    await this.wpService.getPortfolioItemBySlug(slug)
          .subscribe( post => {
            this.post = post[0];
            this.postContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content.rendered); //secure html content to avoid warnings
            this.type = this.post.acf.category;
            if (this.post.acf.post_gallery != false){
              this.slides = this.post.acf.post_gallery;
            }
            if (this.slides.length > 0){
              this.setupSlider(this.slides.length);
            }

            if( this.slides.length == 2 ){
              this.gallerySectionWidth = 1000;
            } 
            if( this.post.title.rendered.length > 40 ){
              this.fontSize = "2.3rem";
            }

            if( this.post.acf.video_url != '' ){
              this.postVideo = true;
              let videoUrl = this.getVideoUrl();
              this.slides.push({
                type: 'video',
                url: videoUrl
              })
    
              this.setupSlider(this.slides.length);
            }
            this.titleForTag = this.post.title.rendered.replace('&#038;', '&'); 
            this.updateTags();
            this.loading = false;
          },(err) => {

          });
  }
  
  getVideoUrl(){
    if( this.post.acf.video_url != '' ){
      let urlPart1 = this.post.acf.video_url.substring(0, 19);
      let urlPart2 = this.post.acf.video_url.substring(19, this.post.acf.video_url.length);
      let finalUrl = `${urlPart1}-nocookie${urlPart2}`
      this.videoSecureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
      return this.videoSecureUrl;
    }
  }



  updateTags(){
    let description = this.post.content.rendered.substring(4, 60);
    this.titleService.setTitle(`WAYPOINT | ${this.titleForTag}`);
    this.metaTagService.updateTag({ 
      name: 'description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:text:title', 
      content: `WAYPOINT | ${this.titleForTag}` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:title', 
      content: `WAYPOINT | ${this.titleForTag}` 
    })
    // this.metaTagService.updateTag({ 
    //   property: 'og:description', 
    //   content: `${description}` 
    // })
    this.metaTagService.updateTag({ 
      property: 'og:image', 
      content: `${this.post.acf.hero_image.url}` 
    })
    
  }

  afterChange(event){
    let current = event.currentSlide;
    this.currentSlide = current;
  }

  setupSlider(slidesLength: number){
    if(slidesLength <= 3){
      slidesLength = slidesLength;
    }else{
      slidesLength = 3;
    }
    this.productSlider = {
      "slidesToShow": slidesLength,
      "slidesToScroll": 1,
      "infinite": true,
      "draggable": true,
      "swipeToSlide": true,
      "centerMode": true,
      "centerPadding": '50px',
      "arrows": false,
      "dots": false,
      "focusOnSelect":true,
      "asNavFor": '.overlay-gallery',
      "responsive": [
        {
          "breakpoint": 1024,
          "settings": {
            "slidesToShow": slidesLength,
            "slidesToScroll": 1,
            "centerMode": true,
            "infinite": true,
            "arrows": false,
            "dots": false
          }
        },
        {
          "breakpoint": 600,
          "settings": {
            "slidesToShow": slidesLength,
            "arrows": false,
            "slidesToScroll": 1
          }
        },
        {
          "breakpoint": 480,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1
          }
        }
      ]
    };
    this.overlaySlideConfig = {
      "slidesToShow": 1, 
      "draggable": true,
      "swipeToSlide": true,
      "centerMode": false,
      "arrows": false,
      "dots": false,
      "infinite": true,
    };
  }

  closeThis(event){
    let elementsArray = ['slider-overlay__container', 'slider-overlay', 'overlay-card']
    let element = event.srcElement.classList[0];
    if (elementsArray.includes(element) ){
      this.showOverlayGallery = false;
    }
  }
  

  showGallery(){
    if(this.mouseDown){
      this.showOverlayGallery = true;
    }
  }

  trackMouse() {
    this.mouseDown = true;  
    try {
      window.setTimeout(() => {
          this.mouseDown = false;
        }, 200);
    }
    catch(ex) { }
    
  }

  imageLoaded(e){
    let image = e.target;
    image.classList.add('fadeIn')
  }

  goBack(){
    this.location.back()
  }

  @HostListener('window:keyup', ['$event'])
  back(event: KeyboardEvent) {
    if(event.key == 'Escape'){
      this.goBack();
    }
  }

}


