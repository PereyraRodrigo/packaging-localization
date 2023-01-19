import { Component, Input, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, BMEnterFrameEvent } from 'ngx-lottie';

@Component({
  selector: 'animations-app',
  template: `<ng-lottie [options]="options" (enterFrame)="loop == false && stop($event)" (animationCreated)="animationCreated($event)" ></ng-lottie>`,
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent  {
    
    @Input() animation = '';
    @Input() loop: boolean;
    private animationItem: AnimationItem;

    options: AnimationOptions = {
        path: `/assets/animations/aboutUs.json`
    };
    
    constructor(private ngZone: NgZone) {}

    animationCreated(animationItem: AnimationItem): void {
      this.animationItem = animationItem;
    }

    stop(event: BMEnterFrameEvent) {
      if (this.loop == true) return;
      this.ngZone.runOutsideAngular(() => {
        if (event.currentTime >= (event.totalTime / 2)) {
          this.animationItem.pause();
      }
      });
    }
}
