import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {



  constructor(private route: ActivatedRoute, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loadedState(true);
  }

}
