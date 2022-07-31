import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemResponsiveTableComponent } from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [ItemResponsiveTableComponent],
  imports: [CommonModule, IonicModule],
  exports: [ItemResponsiveTableComponent]
})
export class SharedModule {}
