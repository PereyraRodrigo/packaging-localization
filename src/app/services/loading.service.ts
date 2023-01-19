import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaded: boolean = false;

  constructor() { }

  get isLoaded(){
    return this.loaded;
  }

  loadedState( isIt: boolean){
    this.loaded = isIt;
  }
}
