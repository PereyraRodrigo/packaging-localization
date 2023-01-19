import { Component, OnInit } from '@angular/core';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { SlugPipe } from 'src/app/pipes/slug.pipe';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public post = ['title', 'slug', 'category'];
  imgUrl = environment.IMGURL;
  public pageTitle: string;
  public categoryQuery: string;
  public categoryInfo;
  public ghostQuantity = [];
  public loading = true;
  public pageNumber = 1;
  public posts: [] = [];
  public categories: [] = [];

  public queryPage = new BehaviorSubject<number>(1);
  public queryLimit = new BehaviorSubject<number>(6);
  private querySearch = new BehaviorSubject<string>('');
  private queryCategory = new BehaviorSubject<string>('');

  public $posts: Observable<any[]>;
  // allPosts: any[] = [];

  constructor(
    private router: Router,
    private wpService: WpDataService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private scroller: ViewportScroller,
    private slugPipe: SlugPipe
  ) {
    this.updateTags();
  }

  ngOnInit(): void {
    this.categoryQuery = this.route.snapshot.paramMap.get('category');
    if (this.categoryQuery) {
      this.getPostsByCategory(this.queryCategory, this.pageNumber, 6);
      this.getCategoryInfo(this.categoryQuery);
    } else {
      this.getPosts(this.pageNumber, 6);
    }
    this.pageTitle = 'Industry Insights';
    this.ghostQuantity = new Array(6).fill(null);
    this.getCategories();
    this.$posts = merge(
      this.queryPage,
      this.queryLimit,
      this.querySearch,
      this.queryCategory
    ).pipe(
      startWith([]),
      switchMap(() => {
        return this.wpService.getPosts(
          this.queryPage.getValue(),
          this.queryLimit.getValue(),
          this.querySearch.getValue(),
          this.queryCategory.getValue()
        );
      })
    );

    // this.$posts.subscribe(posts => {
    //   this.allPosts = this.allPosts.concat(posts);
    // });
  }

  onSearchQueryChanged(val: string) {
    this.querySearch.next(val);
  }

  onCategoryQueryChanged(val: string) {
    this.queryCategory.next(val);
  }

  getPosts(page, quantity) {
    this.wpService.getPosts(page, quantity).subscribe((posts) => {
      this.posts = posts;
      // console.log(this.posts);
      posts.forEach((element) => {
        // console.log(element._embedded['wp:term'][0]); //create POST object
      });

      this.loading = false;
    });
  }

  getPostsByCategory(category, page, quantity) {
    this.wpService
      .getPostsByCategory(category, page, quantity)
      .subscribe((posts) => {
        this.posts = posts;
        // console.log(this.posts);
        posts.forEach((element) => {
          // console.log(element._embedded['wp:term'][0]); //create POST object
        });

        this.loading = false;
      });
  }

  getCategories = async () => {
    await this.wpService.getCategories().subscribe((categories) => {
      this.categories = categories;
      // console.log(this.categories);
    });
  };

  getCategoryInfo = async (cat) => {
    await this.wpService.getCategoryInfo(cat).subscribe((catInfo) => {
      this.categoryInfo = catInfo;
      // console.log(this.categories);
      this.pageTitle = this.categoryInfo.title;
    });
  };

  paginate(direction) {
    this.scroller.scrollToAnchor('scroll-to');
    this.pageNumber += direction;
    this.queryPage.next(this.pageNumber);
  }

  updateTags() {
    let description = 'See all our blog posts';
    this.titleService.setTitle(`WAYPOINT | Our blog`);
    this.metaTagService.updateTag({
      name: 'description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:text:title',
      content: `WAYPOINT | Our blog`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:image',
      content: `blog.jpg`,
    });
    this.metaTagService.updateTag({
      property: 'og:title',
      content: `WAYPOINT | Our blog`,
    });
    this.metaTagService.updateTag({
      property: 'og:description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      property: 'og:image',
      content: `blog.jpg`,
    });
  }

  navigate(slug: string, category?) {
    let catSlug: string = this.slugPipe.transform(category);
    this.router.navigateByUrl(`blog/${catSlug}/${slug}`);
  }

  getCategorySlug(cat: string) {
    let catSlug: string = this.slugPipe.transform(cat);
    return catSlug
  }

  imageLoaded(e) {
    let image = e.target;
    image.classList.add('fadeIn');
  }

  onScroll() {
    this.paginate(1);
  }

}