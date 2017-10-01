import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Folder } from "./folder";
import { SearchOptions } from "../search-options";
import { SortDirection } from "../sort-direction.enum";
import { environment } from '../../environments/environment';

@Injectable()
export class FolderService {
  private baseUrl:string;

  constructor(private http: Http) {
    this.baseUrl =  `${environment.apiUrl}/franko-letters/get-pagination`;
  }

  getFolders(searchOptions : SearchOptions, filter? : Folder) : Observable<{Items:Folder[], TotalRecordsCount:number}> {
    var response = this.http.post(this.baseUrl, {SearchOptions:searchOptions, Filter: filter})
    .map((r) => r.json())
    console.log({SearchOptions:searchOptions, Filter: filter}); 
    return response;
  }  
}
