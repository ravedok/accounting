import { Component, HostBinding } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @HostBinding('class') componentClass = 'auth-form';

  loading: boolean;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    library.add(faSpinner);
    this.buildForm();
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

  get fields() {
    return this.form.controls;
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    this.loading = true;

    this.authService
      .login(data.email, data.password)
      .then(() => {
        this.toastr.success('Te has identificado correctamente.');
        this.router.navigate(['/']);
      })
      .catch(error => this.toastr.error(error))
      .finally(() => (this.loading = false));
  }
}
