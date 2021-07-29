import { Info } from './../../models/info.model';
import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  updateInfo(info: Info){
    return this.httpClient.put(`${environment.apiUrl}/artist/info`, info).pipe(
        catchError(error => {
          return throwError(error);
        })
      )

  }
}
