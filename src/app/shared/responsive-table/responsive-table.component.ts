import { Component, Input, OnDestroy, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItemTableRow } from 'src/app/items/items.model';
import { PaginatedTable, TableRow, Tabulable } from '../table-classes.model';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ResponsiveTableComponent<T extends TableRow> implements AfterViewInit, OnInit, OnDestroy {
  @Input() data: PaginatedTable<T>;
  pageSubscription: Subscription;
  pageData: T[];
  visibleKeys: string[] = [];
  hiddenKeys: string[] = [];
  header: {[key: string]: string} = {};
  colLimit = 5;
  visibleInfo: boolean[];
  private viewportWidth: number;

  constructor(private platform: Platform) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewportWidth = window.innerWidth;
    console.log(this.viewportWidth);
  }

  ngOnInit(): void {
    if (!!this.data && this.data.length > 0) {
      this.visibleKeys = this.data.keys.splice(0, this.colLimit);
      this.hiddenKeys = this.data.keys.splice(this.colLimit, this.data.keys.length);
      this.header = this.data.header;
      this.visibleInfo = new Array(this.data.length).fill(false);
      this.pageSubscription = this.data.page.subscribe( data => {
        this.pageData = data;
      });
      this.viewportWidth = this.platform.width();
    }

  }

  ngOnDestroy(): void {
    if (!!this.pageSubscription) {this.pageSubscription.unsubscribe();}
  }

  ngAfterViewInit(): void {
    this.resizeColumns();
  }

  resizeColumns() {
    console.log(this.platform.width());
  }

  loadData(event): void {
    this.data.loadMore();
    event.target.complete();
    event.target.disabled = this.data.finished;
  }

  toggleInfo(index: number): void {
    this.visibleInfo[index] = !this.visibleInfo[index];
  }
}

@Component({
  selector: 'app-item-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ItemResponsiveTableComponent extends ResponsiveTableComponent<ItemTableRow> {}
