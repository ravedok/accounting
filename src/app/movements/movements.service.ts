import { Injectable } from '@angular/core';
import { Movement } from './movement.model';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import * as fromAuth from '../auth/auth.reducer';
import * as fromMovements from './movements.reducer';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { User } from '../auth/user.model';
import * as movementsActions from './movements.actions';
import * as movementsSelectors from './movements.selectors';
import { setMovements } from './movements.actions';
import { selectMovementsItem } from './movements.selectors';
import { state } from '@angular/animations';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  movementsListenerSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<{ auth; movements }>,
    private authService: AuthService,
    private db: AngularFirestore
  ) {}

  init() {
    this.store
      .select('auth')
      .pipe(map((auth: fromAuth.AuthState) => auth.user))
      .subscribe((user: User) => {
        this.initMovementsListener(user);
      });
  }

  initMovementsListener(user: User) {
    if (!user) {
      this.store.dispatch(movementsActions.clearMovements());
      this.movementsListenerSubscription.unsubscribe();
      return;
    }

    this.movementsListenerSubscription = this.db
      .collection(`${user.uid}/movements/items`)
      .valueChanges()
      .pipe(
        // TODO Intentar guardar las fechas como Nativas de javascript
        map(items =>
          items.map(
            (data: any) => ({ ...data, date: data.date.toDate() } as Movement)
          )
        )
      )
      .subscribe((movements: Movement[]) => {
        this.store.dispatch(movementsActions.setMovements({ movements }));
      });
  }

  get(uid: string) {
    return this.store.pipe(
      select(movementsSelectors.selectMovementsItem, { uid })
    );
  }

  save(movement: Movement): Promise<void | DocumentReference> {
    if (!movement.uid) {
      movement.uid = this.db.createId();
    }

    return this.db
      .doc(`${this.user.uid}/movements/items/${movement.uid}`)
      .set({ ...movement });
  }

  remove(movement: Movement) {
    return this.db
      .doc(`${this.user.uid}/movements/items/${movement.uid}`)
      .delete();
  }

  get user(): User {
    return this.authService.user;
  }
}
