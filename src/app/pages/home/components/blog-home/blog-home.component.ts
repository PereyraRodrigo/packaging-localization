import { Component, OnInit } from '@angular/core';
import { WpDataService } from 'src/app/services/wp-data.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {
  
  imgUrl = environment.IMGURL;
  isVisible = false;
  public blogPosts: [] = [];

  constructor( private router: Router, 
    private wpService: WpDataService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getPosts();

  }

  getPosts = async() =>{
    await this.wpService.getPostsHome()
    .subscribe( blogPosts => {
      this.blogPosts = blogPosts;
    })
  } 

  navigate(slug: string, category?){
    this.router.navigateByUrl(`blog/${category}/${slug}`);
  }

  onInViewportChange(inViewport: boolean){
    if (inViewport == true){
      this.isVisible = true;
    }
  }
}
