import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadGridService {

  constructor(private http: HttpClient) { }

  getImages(imageUrl){
    const url = imageUrl;
    return this.http.get( url )
              .pipe(
                tap( (resp: any) => { } )
              );
  }
}
