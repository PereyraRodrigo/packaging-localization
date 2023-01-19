import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactForm } from '../interfaces/contact-form.interface';
import { CareerForm } from '../interfaces/career-form.interface';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private http: HttpClient,) { }

  sendMessage(formData: ContactForm) {

    return this.http.post(environment.CONTACT_FORM_ENDPOINT, formData)
      .pipe(
        tap((resp: any) => {
        })
      );

  }

  applyMessage(formData: CareerForm) {
    return this.http.post(environment.CONTACT_FORM_ENDPOINT, formData)
      .pipe(
        tap((resp: any) => {
        })
      );

  }
}
