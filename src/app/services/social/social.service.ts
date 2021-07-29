import { Social } from './../../models/social.model';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private httpClient: HttpClient) { }

  updateSocial(socialNetwork: Social){
    return this.httpClient.put(`${environment.apiUrl}/artist/social`, socialNetwork).pipe(
        catchError(error => {
          return throwError(error);
        })
      )
  }

}
