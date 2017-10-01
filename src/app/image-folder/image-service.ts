import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService {
  private baseUrl: string;
  private getImgUrl: string;

  constructor(private http: Http) {
    this.baseUrl =  `${environment.apiUrl}/franko-images`;
    this.getImgUrl = this.baseUrl + '/load-image?path=';
  }

  getImages(id: string): Observable<{ source: string }[]> {
    var response = this.http.get(this.baseUrl + '/get-images?path=' + id)
      .map((r) => r.json().images.map(img => {
        return { source: `${this.getImgUrl}${id}/${img}` };
      }));

    return response;
  }
}
