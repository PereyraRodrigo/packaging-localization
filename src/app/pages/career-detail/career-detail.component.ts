import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SendMessageService } from 'src/app/services/send-message.service';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';

declare var grecaptcha: any;

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CareerDetailComponent implements OnInit {
  imgUrl = environment.IMGURL;
  public showForm: boolean = false;
  public jobPost: any;
  public postBody: SafeHtml;

  formSubmitted: boolean = false;
  messageSended: boolean = false;
  hasError: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  notesLength: number;
  remainingText= '';

  public careerForm;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private wpService: WpDataService,
    private titleService: Title,
    private metaTagService: Meta,
    private sanitizer: DomSanitizer,
    private sendMessageService: SendMessageService
  ) {}

  ngOnInit(): void {
    let slug = this.route.snapshot.paramMap.get('item');
    this.getPostBySlug(slug);
  }

  ngAfterViewInit() {
    if (grecaptcha !== undefined) {
      grecaptcha.ready(() => {
        grecaptcha.render('recaptcha-el', { theme: 'dark' }, true);
      });
    }
  }

  updateTags() {
    let thumb = `${this.imgUrl}/img/seo/waypoint.jpg`;
    let description = `${this.jobPost.title} | ${this.jobPost.type} | ${this.jobPost.location}`;
    this.titleService.setTitle(
      `${this.jobPost.title} | WAYPOINT - Video game creative agency jobs`
    );
    this.metaTagService.updateTag({
      name: 'description',
      content: `${description}`,
    });
    this.metaTagService.updateTag({
      name: 'twitter:text:title',
      content: `${this.jobPost.title} | WAYPOINT - Video game creative agency jobs`,
    });
    this.metaTagService.updateTag({
      property: 'og:title',
      content: `${this.jobPost.title} | WAYPOINT - Video game creative agency jobs`,
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

  getPostBySlug = async (slug) => {
    await this.wpService.getCareerItemBySlug(slug).subscribe((post) => {
      this.jobPost = post;
      this.postBody = this.sanitizer.bypassSecurityTrustHtml(
        this.jobPost.content
      );
      this.updateTags();
      this.formInit();
    });
  };

  sendMessage() {
    this.formSubmitted = true;
    if (this.careerForm.invalid) {
      return;
    }
    grecaptcha.execute().then((token: string) => {
      this.sendMessageService
        .applyMessage(
          Object.assign({}, this.careerForm.value, { recaptcha_token: token })
        )
        .subscribe(
          (resp) => {
            this.messageSended = true;
          },
          (err) => {
            this.hasError = true;
          }
        );
    });
  }

  formInit() {
    this.careerForm = this.fb.group({
      jobTitle: this.jobPost.title,
      name: ['', Validators.required],
      portfolioLink: [''],
      linkedInLink: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      sender: 'job_application',
      message: ['', Validators.required],
    });
  }

  isValidField(field: string): boolean {
    if (this.careerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
