import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [ResponsiveTableComponent],
  imports: [CommonModule, IonicModule],
  exports: [ResponsiveTableComponent]
})
export class SharedModule {}
