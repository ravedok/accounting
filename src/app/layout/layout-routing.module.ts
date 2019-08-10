import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { dashboardRoutes } from '../dashboard/dashboard.routes';
import { movementsRoutes } from '../movements/movements.routes';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [...movementsRoutes, ...dashboardRoutes],
    data: { animation: 'left' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
