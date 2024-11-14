export class PageResponse<T> {
    public itemsPerPage: number = 10;
    public data: T[] = [];
    public totalItems: number = 1;
    public page: number = 1;
    public totalPage: number = 1
}