import { Component, 
        OnInit, 
        Renderer2, 
        ViewChildren, 
        QueryList, 
        ElementRef,
        trigger,
        state,
        style,
        transition,
        animate,
        keyframes,
        group } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'underscore';

import { FolderService } from "./folder.service";
import { SearchOptions } from "../search-options";
import { Folder } from "./folder";
import { SortDirection } from "../sort-direction.enum";

@Component({
  selector: 'app-folder-storage',
  templateUrl: './folder-storage.component.html',
  styleUrls: ['./folder-storage.component.css'],
  animations: [
    trigger('fadeFilter', [
        transition('void => *', [
            style({opacity:0}), //style only for transition transition (after transiton it removes)
            animate(500, style({opacity:1})) // the new state of the transition(after transiton it removes)
          ]),
          transition('* => void', [
            animate(500, style({opacity:0})) // the new state of the transition(after transiton it removes)
          ])
    ])]
})
export class FolderStorageComponent implements OnInit {
    constructor(private folderService : FolderService, private renderer: Renderer2) { }
    
    private data: {Folders:Folder[], TotalPages:number};
    private itemsOnPage:number = 10;
    
    pager: any = {};
    showFilters:boolean = false;
    options:SearchOptions;
    folder:Folder;
    tableColumnsObj =[
        {Name:"FolderNumber", Display:"№ папки"},          
        {Name:"PageNumber", Display:"№ сторiнки"},         
        {Name:"Author", Display:"Автор документу"},        
        {Name:"Name", Display:"Назва документу"},       
        {Name:"CreationPlace", Display:"Мiсце створення"},      
        {Name:"DateCreation", Display:"Час створ."},     
        {Name:"DateCreationNC", Display:"Час створ. Н/С"},    
        {Name:"PossibleDateCreation", Display:"Можливий час ств. "},  
        {Name:"DateCreationCC", Display:"Час створ. С/C"}, 
        {Name:"Notes", Display:"Примiтки"},
        {Name:"Counter", Display:"Лiчильник"},

    ];

    ngOnInit() {
        this.options = new SearchOptions(
            1, 
            this.itemsOnPage, 
            {SortBy: 'FolderNumber', Dir:SortDirection.Up}
        );
        this.loadData(this.options, this.folder);
    }

    sort(name:string, event:MouseEvent){
        var sortIcon = event.toElement.children.item(0);
        this.options.Sort.SortBy = name;
        var ascFlag = sortIcon != null ? sortIcon.classList.contains("fa-sort-asc") : true;
        if (ascFlag){
            this.options.Sort.Dir = SortDirection.Up;
        } else{
            this.options.Sort.Dir = SortDirection.Down;
        }
        
        this.loadData(this.options, this.folder);
    }


    filterData(filter:any){
        this.folder = new Folder();
        this.tableColumnsObj.forEach((el) =>{
            this.folder[el.Name] = filter.controls[el.Name].value;
        });
        this.loadData(this.options, this.folder);
    }

    goToPage(pageNum: number){
        this.options.pageNum = pageNum;
        if (this.options.pageNum < 1 || this.options.pageNum > this.data.TotalPages) {
            return;
        }
        this.loadData(this.options, this.folder);
    }

    private loadData(options:SearchOptions, filter?: Folder){
        this.folderService.getFolders(options, filter).subscribe((data) => { 
            this.data = data;
            this.setPage(options, data.TotalPages);
        });
    }

    private setPage(options:SearchOptions, totalPages : number) {       
        let from = options.pageNum - 3 > 0 ? options.pageNum -  3 : 1;
        let to = options.pageNum + 3 < +totalPages ? options.pageNum +  3 : +totalPages
        this.pager = {
            currentPage :options.pageNum,
            totalPages:totalPages,
            pages: _.range(from, to + 1)
        };
    }
}

