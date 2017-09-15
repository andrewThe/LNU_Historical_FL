import { SortDirection } from "./sort-direction.enum";

export class SearchOptions {
    constructor(public pageNum: number,
                public itemsCount: number,
                public Sort?:{SortBy:string, Dir:SortDirection}){}
}