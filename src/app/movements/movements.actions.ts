import { createAction, props } from '@ngrx/store';
import { Movement } from './movement.model';

export const setMovements = createAction(
  '[Movements] Set Movements',
  props<{ movements: Movement[] }>()
);

export const clearMovements = createAction('[Movements] Clear Movements');
