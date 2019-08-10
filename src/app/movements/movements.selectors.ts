import { createSelector } from '@ngrx/store';
import { AppState, MovementsState } from './movements.reducer';
import { Movement } from './movement.model';

export const selectMovements = (state: AppState) => state.movements;

export const selectMovementsItems = createSelector(
  selectMovements,
  (state: MovementsState) => state.items
);

export const selectMovementsItem = createSelector(
  selectMovementsItems,
  (state: Movement[], props: { uid: string }) =>
    state.find(item => item.uid === props.uid)
);

export const selectMovementsBalance = createSelector(
  selectMovementsItems,
  (state: Movement[]) => {
    let incomes: number = 0;
    let expenses: number = 0;

    state.forEach(movement => {
      if (movement.type === 'income') {
        incomes += movement.amount;
      } else {
        expenses += movement.amount;
      }
    });

    return {
      incomes,
      expenses
    };
  }
);
