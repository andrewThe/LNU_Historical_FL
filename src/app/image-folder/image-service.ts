import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class ImageService {
  private baseUrl:string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:63602/api/franko-images'
  }

  getImages(id: string) : Observable<{images:string[]}> {
    var response = this.http.get(this.baseUrl + '/get-images?path=' + id)
    .map((r) => r.json());

    return response;
  }  
}
