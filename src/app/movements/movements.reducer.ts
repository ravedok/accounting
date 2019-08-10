import { Movement } from './movement.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as movementsActions from './movements.actions';

export interface MovementsState {
  items: Movement[];
}

export interface AppState {
  movements: MovementsState;
}

const initialState: MovementsState = {
  items: []
};

const movementsReducer = createReducer(
  initialState,
  on(movementsActions.setMovements, (state, { movements }) => ({
    ...state,
    items: movements
  })),
  on(movementsActions.clearMovements, state => ({ ...state, items: [] }))
);

export function reducer(state: MovementsState | undefined, action: Action) {
  return movementsReducer(state, action);
}
