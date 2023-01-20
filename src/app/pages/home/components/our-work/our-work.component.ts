import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-work',
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.scss']
})
export class OurWorkComponent implements OnInit {
  PItem: any[] = [
    {
      "img": "../../../../../assets/img/portfolio-items/MediaImage_OriGames.png",
      "title": "Ori: The Collection",
      "company": "Packaging and Localization",
      "link":"https://www.waypoint.la/portfolio/creative/ori-the-collection-packaging-and-localization",
    },
    {
      "img": "../../../../../assets/img/portfolio-items/Slime-Rancher-Portfolio.jpg",
      "title": "Slime Rancher",
      "company": "Packaging"
    },
    {
      "img": "../../../../../assets/img/portfolio-items/goose.png",
      "title": "Untitled Goose Game",
      "company": "Packaging and Localization"
    },
    {
      "img": "../../../../../assets/img/portfolio-items/Deaths-Gambit-Packaging_Media_Image05-V2.jpg",
      "title": "Death's Gambit",
      "company": "Packaging Art"
    },
    {
      "img": "../../../../../assets/img/portfolio-items/disco-elysium.png",
      "title": "Disco Elysium",
      "company": "Localization"
    },
    {
      "img": "../../../../../assets/img/portfolio-items/dnd.png",
      "title": "D&D",
      "company": "Key Art and Packaging"
    }
  ]
  constructor() { }
  PortfolioItem1='../../../../../assets/img/portfolio-items/waypoint.jpg'
  ngOnInit(): void {
  }

}
