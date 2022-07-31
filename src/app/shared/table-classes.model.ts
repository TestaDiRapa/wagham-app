import { BehaviorSubject, Observable } from 'rxjs';

export interface Tabulable<T> {

  toTableRow(): T;

}

export interface TableRow {

  keys(): string[];

  compare(anyOther: any, key: string): number;

}

export class PaginatedTable<T extends TableRow> {
  private index = 0;
  private currentPage = new BehaviorSubject<T[]>(this.array.slice(this.index, this.index+this.pageSize));

  constructor(
    private array: T[],
    private pageSize: number
  ) {}

  get page(): Observable<T[]> {
    return this.currentPage.asObservable();
  }

  get keys(): string[] {
    if(this.array.length > 0) {
      return this.array[0].keys();
    }
    else {
      return [];
    }
  }

  get length(): number {
    return this.array.length;
  }

  next(): void {
    if ((this.index + this.pageSize) < (this.array.length - 1)) {
      this.index = this.index + this.pageSize;
    }
    this.currentPage.next(this.array.slice(this.index, this.index+this.pageSize));
  }

  previous(): void {
    if ((this.index - this.pageSize) >= 0 ) {
      this.index = this.index - this.pageSize;
    }
    this.currentPage.next(this.array.slice(this.index, this.index+this.pageSize));
  }

  sort(key: string): void {
    this.array = this.array.sort((obj1: T, obj2: T) => obj1.compare(obj2, key));
    this.currentPage.next(this.array.slice(this.index, this.index+this.pageSize));
  }
}
