import { Routes } from '@angular/router';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { MovementsDetailComponent } from './movements-detail/movements-detail.component';

export const movementsRoutes: Routes = [
  {
    path: 'movements/add',
    component: MovementsDetailComponent,
    data: {
      name: 'Añadir movimiento',
      animation: 'movement',
      title: 'Añadir movimiento'
    }
  },
  {
    path: 'movements/:uid',
    component: MovementsDetailComponent,
    data: {
      name: 'Editar movimientos',
      animation: 'movement',
      title: 'Editar movimiento'
    }
  },
  {
    path: 'movements',
    component: MovementsListComponent,
    data: { name: 'Movimientos', animation: 'right', title: 'Movimientos' }
  }
];
