import { BehaviorSubject, Observable } from 'rxjs';

export interface Tabulable<T> {

  toTableRow(): T;

}

export interface TableRow {

  keys(): string[];

  header(): {[key: string]: string};

  compare(anyOther: any, key: string): number;

}

export class PaginatedTable<T extends TableRow> {
  private index = this.pageSize;
  private currentPage = new BehaviorSubject<T[]>(this.array.slice(0, this.index));

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

  get header(): {[key: string]: string} {
    if(this.array.length > 0) {
      return this.array[0].header();
    }
    else {
      return {};
    }
  }

  get length(): number {
    return this.array.length;
  }

  get finished(): boolean {
    return this.index >= this.array.length;
  }

  loadMore(): void {
    if(this.index < this.array.length) {
      this.index += this.pageSize;
    }
    this.currentPage.next(this.array.slice(0, this.index));
  }

  sort(key: string): void {
    this.array = this.array.sort((obj1: T, obj2: T) => obj1.compare(obj2, key));
    this.currentPage.next(this.array.slice(this.index, this.index+this.pageSize));
  }
}
