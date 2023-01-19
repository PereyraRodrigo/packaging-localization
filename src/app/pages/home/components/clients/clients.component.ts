import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {


  isVisible = false;
  constructor() { }

  ngOnInit(): void { }

  onInViewportChange(inViewport: boolean) {
    if (inViewport == true){
      this.isVisible = true;
    }
  }
}
