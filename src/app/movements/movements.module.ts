import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbDateParserFormatter,
  NgbDateAdapter,
  NgbDateNativeUTCAdapter,
  NgbModalModule,
  NgbDateNativeAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { MovementsDetailComponent } from './movements-detail/movements-detail.component';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDateESParserFormatter } from './ngb-date-es-parser-formatter';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './movements.reducer';
import { MovementsService } from './movements.service';

@NgModule({
  declarations: [MovementsDetailComponent, MovementsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    FontAwesomeModule,

    SharedModule,
    StoreModule.forFeature('movements', reducer)
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateESParserFormatter },
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class MovementsModule {
  constructor(movementsService: MovementsService) {
    movementsService.init();
  }
}
