import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hero-grid',
  templateUrl: './hero-grid.component.html',
  styleUrls: ['./hero-grid.component.scss']
})
export class HeroGridComponent implements OnInit {

  loading = false;
  imgUrl = environment.IMGURL;
  heroBackground: string = ''; //default background for the hero
  selectedIndex: number = null; //default hero grid item active
  showArrow: boolean = true;
  heroItems_ = [];
  heroItems = [{
    title: 'Creative',
    slug: 'creative',
    subtitle: '',
    image: '',
    onHoverImage: `${this.imgUrl}/img/hero/gundam.jpg`,
    url: ''
  },
  {
    title: 'Collectibles',
    slug: 'collectibles',
    subtitle: '',
    image: '',
    onHoverImage: `${this.imgUrl}/img/hero/happy.jpg`,
    url: ''
  },

  {
    title: 'E-Commerce',
    slug: 'e-commerce',
    subtitle: '',
    image: '',
    onHoverImage: `${this.imgUrl}/img/hero/ecommerce.jpg`,
    url: ''
  },
  {
    title: 'Experiential',
    slug: 'experiential',
    subtitle: '',
    image: '',
    onHoverImage: `${this.imgUrl}/img/hero/experiential.jpg`,
    url: ''
  },
  {
    title: 'Games',
    slug: 'games',
    subtitle: '',
    image: '',
    onHoverImage: `${this.imgUrl}/img/hero/games.jpg`,
    url: '',
  },
  {
    title: 'Blockchain',
    slug: 'blockchain',
    subtitle: 'Coming soon',
    image: '',
    onHoverImage: ``,
    url: '',
    disabled: true,
    noise: true
  }
];
  animated = false;
  dark: boolean = false; 
  
  overlayBg = `${this.imgUrl}/img/hero/overlayTextureSmall.png`; 
  bgVisible;

  constructor( private http:HttpClient, 
              private router: Router,
              private wpService: WpDataService,
              public screenSize: ScreenSizeService) {
   
  }

  ngOnInit(): void {
    
  //  this.preload();
  if (this.screenSize.getScreenSize() == true){
    this.autoRotate();
  }
   this.selectedIndex = 0;
   this.bgVisible = 0;
  }


  async autoRotate(){
    var loop = 0;  
    if (this.heroItems.length > 0){

      for (let i = 0; i < 5; i++) {
        this.setActive(i);
        if(i == 4){
          loop++
          i = -1;
        }
        await this.delay(2000)
        if(loop == 5){ //how many times we want it to loop
          this.setActive(0);
          return
        }
      }
    }
  }


  delay = (amount) => {
    return new Promise((resolve) => {
      setTimeout(resolve, amount);
    });
  }


  setActive(index: number, dark?: boolean) {
    this.dark = dark;
    this.changeBg(index);
    this.selectedIndex = index;
  }

  changeBg(index){
    // this.animated = true; if true, bg will blur
    
    this.bgVisible = index;
    setTimeout(() => {
      this.animated = false;
    }, 500);

  }

  navigateTo(category){
    this.router.navigateByUrl(`portfolio/${category}`)
  }

  preload = async() => {
    await this.wpService.getGridItems()
      .subscribe( resp => {
        this.heroItems = resp
        this.loading = false;
        if (this.screenSize.getScreenSize() == true){
          this.autoRotate();
        }
      })
  }

  imageLoaded(e){
    let image = e.target;
    image.classList.add('fadeIn')
  }

}
