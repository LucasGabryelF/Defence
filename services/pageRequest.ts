export class PageRequest {
    public itemsPerPage: number = 15;
    public page: number = 1;

    constructor(itemsPerPage: number, page: number) {
        this.itemsPerPage = itemsPerPage;
        this.page = page

    }
}