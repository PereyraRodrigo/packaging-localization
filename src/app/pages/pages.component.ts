import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheatCodeService } from '../services/cheat-code.service';
import { ScrollToTopService } from '../services/scroll-to-top.service';
import { LoadingService } from '../services/loading.service';
import { BlockScrollService } from '../services/block-scroll.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  imgUrl = environment.IMGURL;
  key: string;
  cheated: boolean = false;
  play: boolean = false;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
    if(this.key == 'Escape' && this.cheated){this.closeGame()}
    if (this.cheated){ return }
    this.cheated = this.cc.getKeys(this.key);
    if (this.cheated){
      this.ls.lockScroll(true)
      this.lockScroll()
    }
  }

  constructor(private cc : CheatCodeService, private renderer: Renderer2, public scroll: ScrollToTopService, public loadingService: LoadingService, public ls: BlockScrollService) { }

  ngOnInit(): void {
    this.scroll.scrollToTop();
  }

  lockScroll(){
    if(this.ls.isLocked){
      this.renderer.addClass(document.body, 'lockScroll');
    }else{
      this.renderer.removeClass(document.body, 'lockScroll');
    }
  }

  closeThis(event) {
    if (event.srcElement.id == 'hidden-message') {
        this.closeGame();
    }

  }

  closeGame(){
    this.cheated = false;
    this.play = false;
    this.ls.lockScroll(false)
    this.lockScroll()
  }

}
