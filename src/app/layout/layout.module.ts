import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MovementsModule } from '../movements/movements.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LayoutRoutingModule,
    DashboardModule,
    MovementsModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
  constructor() {}
}
