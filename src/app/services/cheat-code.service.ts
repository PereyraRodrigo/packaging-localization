import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheatCodeService {

  cheatcode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "a", "b", "a"];
  keys = [];
  lastKeyTime = Date.now();
  constructor() { }

  getKeys(key){
    const currentTime = Date.now();
    if (currentTime - this.lastKeyTime > 1500) {
      this.keys = [];
    }
    this.keys.push(key);
    this.lastKeyTime = currentTime;
    
    if (JSON.stringify(this.keys).toLowerCase() == JSON.stringify(this.cheatcode).toLowerCase()){
      return true;
    }
  }

  
}
