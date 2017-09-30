import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Folder } from "./folder";
import { SearchOptions } from "../search-options";
import { SortDirection } from "../sort-direction.enum";

@Injectable()
export class FolderService {
  private baseUrl:string;

  constructor(private http: Http) {
    this.baseUrl = './folders'
  }

  getFolders(searchOptions : SearchOptions, filter? : Folder) : Observable<{Folders:Folder[], TotalPages:number}> {
    var response = this.http.post(this.baseUrl, {SearchOptions:searchOptions, Filter: filter})
    .map((r) => r.json())
    console.log({SearchOptions:searchOptions, Filter: filter}); 
    return response;
  }  
}
