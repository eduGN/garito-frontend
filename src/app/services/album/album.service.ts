import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Album } from '../../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

constructor(private httpClient: HttpClient) { }

saveAlbum(album: Album){
  return this.httpClient.put(`${environment.apiUrl}/artist/album`, album).pipe(
      catchError(error => {
        return throwError(error);
      })
    )

}

}
