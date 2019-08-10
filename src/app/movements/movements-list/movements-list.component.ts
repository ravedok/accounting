import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faExchangeAlt,
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../movements.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movement } from '../movement.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsService } from '../movements.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.scss']
})
export class MovementsListComponent implements OnInit {
  @ViewChild('confirmRemoveTpl', { static: false })
  confirmRemoveTpl: TemplateRef<any>;

  title = 'Movimientos';
  icon = 'exchange-alt';

  movements$: Observable<Movement[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: NgbModal,
    private movementsService: MovementsService,
    private toastr: ToastrService
  ) {
    library.add(faExchangeAlt, faTrash, faPen);

    this.movements$ = this.store.select('movements').pipe(
      map(movements => {
        return movements.items.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
      })
    );
  }

  ngOnInit() {}

  add() {
    this.router.navigate([`/movements/add`]);
  }

  edit(movement: Movement) {
    this.router.navigate(['/movements/', movement.uid]);
  }

  remove(movement: Movement) {
    this.modalService
      .open(this.confirmRemoveTpl)
      .result.then(result => {
        this.movementsService
          .remove(movement)
          .then(() =>
            this.toastr.success('El movimiento ha sido borrado correctamente')
          )
          .catch(() =>
            this.toastr.error(
              'Se ha producido un error al borrar el movimiento'
            )
          );
      })
      .catch(() => {});
  }
}
