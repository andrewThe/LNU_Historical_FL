import { SortDirection } from "./sort-direction.enum";

export class SearchOptions {
    constructor(public PageNum: number,
                public ItemsCount: number,
                public SortOptions?:{SortBy:number, SortDirection:SortDirection}){}
}