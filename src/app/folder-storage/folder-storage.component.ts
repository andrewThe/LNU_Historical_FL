import {
    Component,
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
    group
} from '@angular/core';

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
                style({ opacity: 0 }), //style only for transition transition (after transiton it removes)
                animate(500, style({ opacity: 1 })) // the new state of the transition(after transiton it removes)
            ]),
            transition('* => void', [
                animate(500, style({ opacity: 0 })) // the new state of the transition(after transiton it removes)
            ])
        ])]
})
export class FolderStorageComponent implements OnInit {
    constructor(private folderService: FolderService, private renderer: Renderer2) { }

    private data: { Folders: Folder[], TotalPages: number } = { Folders: [], TotalPages: 0};
    private itemsOnPage: number = 10;

    pager: any = {};
    showFilters: boolean = false;
    options: SearchOptions;
    folder: Folder;
    tableColumnsObj = [
        { Id: 0, Name: "FolderNumber", Display: "№ папки" },
        { Id: 1, Name: "PageNumber", Display: "№ сторiнки" },
        { Id: 2, Name: "Author", Display: "Автор документу" },
        { Id: 3, Name: "Name", Display: "Назва документу" },
        { Id: 4, Name: "CreationPlace", Display: "Мiсце створення" },
        { Id: 5, Name: "DateCreationNC", Display: "Час створ. Н/С" },
        { Id: 6, Name: "PossibleDateCreation", Display: "Можливий час ств. " },
        { Id: 7, Name: "DateCreationCC", Display: "Час створ. С/C" },
        { Id: 8, Name: "Notes", Display: "Примiтки" },
        { Id: 9, Name: "Counter", Display: "Лiчильник" }
    ];

    ngOnInit() {
        this.options = new SearchOptions(
            1,
            this.itemsOnPage,
            { SortBy: 0, SortDirection: SortDirection.Up }
        );
        this.loadData(this.options, this.folder);
    }

    sort(name: number, event: MouseEvent) {
        var sortIcon = event.toElement.children.item(0);
        this.options.SortOptions.SortBy = name;
        var ascFlag = sortIcon != null ? sortIcon.classList.contains("fa-sort-asc") : true;
        if (ascFlag) {
            this.options.SortOptions.SortDirection = SortDirection.Up;
        } else {
            this.options.SortOptions.SortDirection = SortDirection.Down;
        }

        this.loadData(this.options, this.folder);
    }


    filterData(filter: any) {
        this.folder = new Folder();
        this.tableColumnsObj.forEach((el) => {
            this.folder[el.Name] = filter.controls[el.Name].value;
        });
        this.loadData(this.options, this.folder);
    }

    goToPage(pageNum: number) {
        this.options.PageNum = pageNum;
        if (this.options.PageNum < 1 || this.options.PageNum > this.data.TotalPages) {
            return;
        }
        this.loadData(this.options, this.folder);
    }

    private loadData(options: SearchOptions, filter?: Folder) {
        this.folderService.getFolders(options, filter).subscribe((data) => {
            this.data = data != null ? { Folders: [], TotalPages: 0 } : data;
            this.setPage(options, data.TotalPages);
        });
    }

    private setPage(options: SearchOptions, totalPages: number) {
        let from = options.PageNum - 3 > 0 ? options.PageNum - 3 : 1;
        let to = options.PageNum + 3 < +totalPages ? options.PageNum + 3 : +totalPages
        this.pager = {
            currentPage: options.PageNum,
            totalPages: totalPages,
            pages: _.range(from, to + 1)
        };
    }
}

