import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgUrl = environment.IMGURL;
  constructor(    
    private titleService: Title,
    private metaTagService: Meta,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.updateTags();
  }

  updateTags(){
    let thumb = `${this.imgUrl}/img/seo/waypoint.jpg`
    let description = `WAYPOINT is a creative production company. Team of highly skilled producers and Marketing Artists at your service.`;
    this.titleService.setTitle(`WAYPOINT | Package Localization`);
    this.metaTagService.updateTag({ 
      name: 'description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:text:title', 
      content: `WAYPOINT | Package Localization` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:title', 
      content: `WAYPOINT | Package Localization` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:description', 
      content: `${description}` 
    })
    this.metaTagService.updateTag({ 
      property: 'og:image', 
      content: `${thumb}` 
    })
    this.metaTagService.updateTag({ 
      name: 'twitter:image', 
      content: `${thumb}` 
    })    
  }


}
