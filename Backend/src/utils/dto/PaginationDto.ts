export class PaginationDto<T> {
    public totalPages?: number;
    public totalRows?: number;
    public currentPage?: number;
    public size?: number;
    public data?: T[];
}