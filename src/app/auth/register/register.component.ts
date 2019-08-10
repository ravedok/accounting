import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostBinding
} from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { emailValidator, matchValidator } from 'src/app/shared/validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @HostBinding('class') componentClass = 'auth-form';

  loading: boolean;
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.buildForm();
    library.add(faSpinner);
  }

  get fields() {
    return this.form.controls;
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [emailValidator, Validators.required]],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(4)]],
          repeat: ['', Validators.required]
        },
        { validator: matchValidator }
      )
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService
      .register(
        this.form.value.name,
        this.form.value.email,
        this.form.value.passwords.password
      )
      .then(() => {
        this.toastr.success('Te has registrado correctamente.');
        this.router.navigate(['/']);
      })
      .catch(error => this.toastr.error(error))
      .finally(() => (this.loading = false));
  }

  hasError(field: string, error?: string) {
    const path = field.split('.');
    let group: FormGroup = this.form;
    if (path.length > 1) {
      group = this.form.get(path[0]) as FormGroup;
    }

    field = path.pop();

    const control: AbstractControl = group.get(field);

    if (control.untouched) {
      return false;
    }

    if (!error) {
      return control.errors;
    }

    return control.hasError(error);
  }
}
