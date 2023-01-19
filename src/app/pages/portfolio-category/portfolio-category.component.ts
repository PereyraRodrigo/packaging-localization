import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { WpDataService } from 'src/app/services/wp-data.service';
import { caegoryItem } from '../../helper/portfolio-categories';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-portfolio-category',
  templateUrl: './portfolio-category.component.html',
  styleUrls: ['./portfolio-category.component.scss'],
})
export class PortfolioCategoryComponent implements OnInit {
  categoryItem;
  public isEcommerce: boolean = false;
  public ghostQuantity = [];
  public pageNum: number = 1;
  portfolioItems = [];
  public currentLength: number = 0;
  public lastLength: number = 0;
  type: string;
  isScrolled: boolean = false;
  showMessage: boolean = false;
  hasMoreItems: boolean = true;
  public prevItem: string = '';
  public nextItem: string = '';

  public isLoading: boolean = false;

  @ViewChild('loadMore') loadMoreArea: ElementRef;

  randomCount: number = 50000;

  constructor(
    private router: Router,
    private wpService: WpDataService,
    private metaTagService: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private navBar: NavBarService,
    public loadingService: LoadingService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageNum = 1;
      this.portfolioItems.length = 0;
      this.currentLength = 0;
      this.lastLength = 0;
      this.hasMoreItems = true;
      this.type = paramMap.get('type');
      this.isEcommerce = true
        ? this.type == 'e-commerce'
        : (this.isEcommerce = false);
      this.getItemsByCategory(this.type, this.pageNum);
      this.getCategoryDetail(this.type);
    });
  }

  ngOnInit(): void {
  }

  updateTags() {
    this.titleService.setTitle(
      `WAYPOINT | ${this.type.toUpperCase()}, ${this.categoryItem.seo_title}`
    );
    this.metaTagService.updateTag({
      name: 'og:title',
      content: `WAYPOINT | ${this.type.toUpperCase()}`,
    });
    this.metaTagService.updateTag({
      name: 'description',
      content: `WAYPOINT | ${this.categoryItem.description}`,
    });
    this.metaTagService.updateTag({
      name: 'og:description',
      content: `WAYPOINT | ${this.categoryItem.description}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:text:title',
      content: `WAYPOINT | ${this.type.toUpperCase()}, ${
        this.categoryItem.seo_title
      }`,
    });
  }
  getCategoryDetail(cat) {

    const categoryItem = caegoryItem.items.filter(
      (item) => item.slug == cat.toLowerCase()
    );
    this.categoryItem = categoryItem[0];
    if (Array.isArray(this.categoryItem.subtitle)){
      this.categoryItem.subtitle = this.categoryItem.subtitle.join('.').split('.', 2);
    }else{
      this.categoryItem.subtitle = this.categoryItem.subtitle.split('.', 2);
    }


    this.getNextAndPrev(caegoryItem.items.indexOf(this.categoryItem));
    console.log(caegoryItem.items.indexOf(this.categoryItem))
  }

  getNextAndPrev(index: number) {
    let p: number;
    let n: number;
    if (index - 1 == -1) {
      p = caegoryItem.items.length - 1;
    } else {
      p = index - 1;
    }
    if (index + 1 >= caegoryItem.items.length) {
      n = 0;
    } else {
      n = index + 1;
    }

    this.prevItem = caegoryItem.items[p].slug;
    this.nextItem = caegoryItem.items[n].slug;
  }

  getItemsByCategory = async (category, pageNum?, showLoader?: boolean) => {
    this.wpService
      .getPortfolioItemsByCategory(category, pageNum)
      .subscribe((resp) => {
        this.portfolioItems = this.portfolioItems.concat(resp);
        this.currentLength = this.portfolioItems.length;
        if (this.portfolioItems.length == this.lastLength) {
          this.hasMoreItems = false;
        }
        this.isLoading = false;
      });

    if (showLoader == false) {
      this.loadingService.loadedState(true);
    }
  };

  onScroll() {
    this.loadMore();
  }

  loadMore = () => {
    this.pageNum = this.pageNum + 1;
    this.getItemsByCategory(this.type, this.pageNum, false);
    this.isLoading = true;
    if (
      this.lastLength < this.currentLength &&
      this.loadingService.isLoaded == true
    ) {
      this.lastLength = this.currentLength;
    }
  };

  navigate(slug: string, category?) {
    this.router.navigateByUrl(`portfolio/${category}/${slug}`);
  }

  navigateCategory( cat: string){
      this.router.navigateByUrl(`portfolio/${cat}`) 
  }

  imageLoaded(e) {
    let image = e.target;
    image.classList.add('fadeIn');
  }

  randomCountStop: any = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 6)
    this.randomCount += randomNumber;
    if (this.randomCount == 60000)
    {
      clearInterval(this.randomCountStop);
    }
  },860)
}
