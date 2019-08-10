import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faCalendarAlt,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Movement } from '../movement.model';
import { MovementsService } from '../movements.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-movements-detail',
  templateUrl: './movements-detail.component.html',
  styleUrls: ['./movements-detail.component.scss']
})
export class MovementsDetailComponent implements OnInit {
  title = 'Añadir movimiento';
  icon = 'plus-circle';

  loading: boolean;
  form: FormGroup;

  constructor(
    private movementsService: MovementsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.buildForm();
    library.add(faPlusCircle, faCalendarAlt, faSave);
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.get('uid') !== null),
        switchMap((params: ParamMap) =>
          this.movementsService.get(params.get('uid'))
        )
      )
      .subscribe(movement => this.buildForm(movement));
  }

  buildForm(data: Movement = new Movement()) {
    this.form = this.fb.group({
      uid: [data.uid],
      date: [data.date, [Validators.required]],
      description: [data.description, [Validators.required]],
      amount: [data.amount, [Validators.required, Validators.min(0.01)]],
      type: [data.type]
    });
  }

  hasError(field: string, error?: string) {
    const control: AbstractControl = this.form.get(field);

    if (control.untouched) {
      return false;
    }

    if (!error) {
      return control.errors;
    }

    return control.hasError(error);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.movementsService
      .save(this.form.value)
      .then(() => {
        this.toastr.success('El movimiento se ha guardado correctamente');
        this.location.back();
      })
      .catch(() =>
        this.toastr.error('Se ha producido un error al guardar el movimiento')
      );
  }

  cancel() {
    this.location.back();
  }
}
