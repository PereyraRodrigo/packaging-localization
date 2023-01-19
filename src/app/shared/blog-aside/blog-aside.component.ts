import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { LoadingService } from 'src/app/services/loading.service';
import { WpDataService } from 'src/app/services/wp-data.service';


@Component({
  selector: 'blog-aside',
  templateUrl: './blog-aside.component.html',
  styleUrls: ['./blog-aside.component.scss']
})
export class BlogAsideComponent implements OnInit {

  @Input() relatedPosts = [];
  @Input() postCategory: any;
  @Input() categories: [] = [];
  public loading = true;

  @Output() onQueryChanged = new EventEmitter<string>();
  @Output() onCatQueryChanged = new EventEmitter<string>();
  @Output() onRelatedChanged = new EventEmitter<string>();
  
  constructor(private router: Router, private wpService: WpDataService, private slugPipe: SlugPipe, public loadingService: LoadingService,) { 
    
  }

  ngOnInit(): void {
  }

  slugify(title){
    return this.slugPipe.transform(title);
  }

  navigate(slug: string, category?){
    let title =  this.slugify(slug);
    let cat = this.slugify(category);
    this.router.navigateByUrl(`blog/${cat}/${title}`);
  }

  navigateCategory(category: string){
    this.onQueryChanged.emit(category)
    
  }

  search(term: string){
    this.onQueryChanged.emit(term);
  }


  getBlogArticleLink(title: string, cat: string) {
    let _title =  this.slugify(title);
    let _cat = this.slugify(cat);
    let new_cat = _cat
      .replace("in-quot", "")
      .replace("quot", ""); //workaround for in-quotCategoryquot issue
    let new_title = _title
      .replace(/[’]/g, "")
      .replace("8217", "")
      .replace("8217", "")
      .replace("8211", "")
      .replace("8220", "")
      .replace("8230", "")
      .replace("8221", "")
      .replace("038", "")
      .replace("8230", "")
      .replace("038", "")
      .replace("x2122", "")
      .replace(/--/g, "-")
      .replace(/[']/g, ""); //workaround for &#8217 (') in title
    return `/blog/${new_cat}/${new_title}`
  }
}
