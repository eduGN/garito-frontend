import { Member } from './../../models/member.model';
import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }

  saveMember(member: Member){
    return this.httpClient.put(`${environment.apiUrl}/artist/member`, member).pipe(
        catchError(error => {
          return throwError(error);
        })
      )
  }

}
