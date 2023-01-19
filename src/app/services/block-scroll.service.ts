import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockScrollService {
  scrollLocked: boolean = false;

  constructor() { }

  get isLocked(){
    return this.scrollLocked;
  }

  lockScroll(lock: boolean){
    this.scrollLocked = lock;
  }
}
