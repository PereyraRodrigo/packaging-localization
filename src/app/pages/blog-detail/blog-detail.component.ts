import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ScrollToTopService } from 'src/app/services/scroll-to-top.service';
import { WpDataService } from 'src/app/services/wp-data.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  public blogPostSlug;
  public post;
  public postContent;
  public loading = true;
  public relatedPosts = [];
  public fontSize = 'clamp(4rem, 5rem, 6vw)';

  private queryPost = new BehaviorSubject<string>('');

  public $post: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private wpService: WpDataService,
    private titleService: Title,
    private metaTagService: Meta,
    private sanitizer: DomSanitizer,
    public loadingService: LoadingService,
    public scroll: ScrollToTopService
  ) {}

  ngOnInit(): void {
    this.blogPostSlug = this.route.snapshot.paramMap.get('post');
    this.getPostBySlug(this.blogPostSlug);
  }

  onPostChanged(val: string) {
    this.queryPost.next(val);
  }

  getPostBySlug = (blogPost) => {
    this.loading = true;
    this.wpService.getPostsBySlug(blogPost).subscribe((post) => {
      this.loading = true;
      this.post = post[0];
      this.postContent = this.sanitizer.bypassSecurityTrustHtml(
        this.post.content.rendered
      ); 
      //secure html content to avoid warnings
      this.relatedPosts = this.post['jetpack-related-posts'];
      if (this.post.title.rendered.length > 40) {
        this.fontSize = 'clamp(2rem, 5rem, 3vw)';
      }
      this.updateTags();
      this.loading = false;
    });
  };

  updateTags() {
    let description = this.post.excerpt.rendered.slice(3, -5);
    this.titleService.setTitle(`WAYPOINT | ${this.post.title.rendered}`);
    this.metaTagService.updateTag({
      name: 'description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:text:title',
      content: `WAYPOINT | ${this.post.title.rendered}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:image',
      content: `${this.post.jetpack_featured_media_url}`,
    });
    this.metaTagService.updateTag({
      property: 'og:title',
      content: `WAYPOINT | ${this.post.title.rendered}`,
    });
    // this.metaTagService.updateTag({
    //   property: 'og:description',
    //   content: `${description}`,
    // });
    this.metaTagService.updateTag({
      property: 'og:image',
      content: `${this.post.jetpack_featured_media_url}`,
    });
  }

  imageLoaded(e) {
    let image = e.target;
    image.classList.add('fadeIn');
  }
}
