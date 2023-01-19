import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent implements OnInit {
  imgUrl = environment.IMGURL;
  public posts = [];
  public obs: Subscription;
  public rotatingAngle: string = '';
  public rotatingClass: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpService: WpDataService,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.updateTags();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  updateTags() {
    let thumb = `${this.imgUrl}/img/seo/waypoint.jpg`;
    let description =
      'The WAYPOINT team is always looking to expand our diverse skill set. Our team has included business development directors, motion graphics artists, graphic designers, web developers, video editors, illustrators, storyboard artists, and more. We always welcome marketing-focused individuals to inquire about our career opportunities.';
    this.titleService.setTitle(
      `Careers | WAYPOINT - Video game creative agency jobs`
    );
    this.metaTagService.updateTag({
      name: 'description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:text:title',
      content: `Careers | WAYPOINT - Video game creative agency jobs`,
    });
    this.metaTagService.updateTag({
      property: 'og:title',
      content: `Careers | WAYPOINT - Video game creative agency jobs`,
    });
    this.metaTagService.updateTag({
      property: 'og:description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      property: 'og:image',
      content: `${thumb}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:image',
      content: `${thumb}`,
    });
  }

  getPosts() {
    this.obs = this.wpService.getJobPosts().subscribe((resp) => {
      this.posts = resp;
    });
  }

  navigate(slug: string) {
    this.router.navigateByUrl(`careers/${slug}`);
  }
}
