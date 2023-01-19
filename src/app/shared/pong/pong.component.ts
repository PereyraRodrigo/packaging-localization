import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loadedState(true);
  }

}
