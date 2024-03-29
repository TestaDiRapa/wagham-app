/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item, ItemData } from './items.model';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = new BehaviorSubject<Item[]>(null);

  constructor(private http: HttpClient) {}

  get items(): Observable<Item[]> {
    return this._items.pipe(
      switchMap((items) => {
        if (!!items) {
          return of(items);
        } else {
          return this.fetchItems();
        }
      })
    );
  }

  fetchItems() {
    return this.http.get<ItemData[]>(`${environment.waghamApi}/items`).pipe(
      take(1),
      map((responseData) => responseData.map((itemData) => new Item(itemData)))
    );
  }
}
