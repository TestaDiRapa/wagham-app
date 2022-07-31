import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemTableRow } from 'src/app/items/items.model';
import { PaginatedTable, TableRow, Tabulable } from '../table-classes.model';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ResponsiveTableComponent<T extends TableRow> implements OnInit, OnDestroy {
  @Input() data: PaginatedTable<T>;
  pageSubscription: Subscription;
  pageData: T[];
  keys: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if (!!this.data && this.data.length > 0) {
      this.keys = this.data.keys;
      this.pageSubscription = this.data.page.subscribe( data => {
        this.pageData = data;
      });
    }
  }

  ngOnDestroy(): void {
    if (!!this.pageSubscription) {this.pageSubscription.unsubscribe();}
  }

}

@Component({
  selector: 'app-item-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ItemResponsiveTableComponent extends ResponsiveTableComponent<ItemTableRow> {}
