import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ResponsiveTableComponent implements OnInit {
  @Input() data: {[key: string]: any}[];
  keys: string[] = [];

  constructor() { }

  ngOnInit() {
    if (!!this.data && this.data.length > 0) {
      this.keys = this.data[0].keys;
    }
  }

}
