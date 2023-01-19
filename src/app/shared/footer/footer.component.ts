import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  imgUrl = environment.IMGURL;
  taglines = [
    "It's dangerous to go alone, take this",
    "Stay a while and Listen",
    "Wild trainer wants to battle",
    "You must gather your party before venturing forth",
    "Rip and Tear",
    "It’s time to kick ass and chew bubble gum",
    "Longing makes the heart grow fonder",
    "I survived because the fire inside burned brighter than the fire around me.",
    "What a contradiction a human is",
    "The thing about happiness is that you only know you had it when it's gone",
    "It's the end of the world, all over again",
    "It was just me against the world... and the world had it coming",
  ]

  tagLine = "It's dangerous to go alone, take this"

  constructor(private router: Router, public navService: NavBarService, public screenSize: ScreenSizeService) { }

  ngOnInit(): void {
  this.tagLine =  this.getRandomText();
  }


  getRandomText(){
    let randomText = this.taglines[Math.floor(Math.random() * this.taglines.length)];
    return randomText;
  }

  navigate(category){
    this.router.navigate([`portfolio/${category}`]);
  }


}
