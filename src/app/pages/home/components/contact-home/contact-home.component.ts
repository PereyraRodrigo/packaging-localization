import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})
export class ContactHomeComponent implements OnInit {

  constructor(public navService: NavBarService) { }

  ngOnInit(): void {
  }

}
