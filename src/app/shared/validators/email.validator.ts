import { FormControl } from '@angular/forms';

const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

export function emailValidator(c: FormControl) {
  return !c.value || EMAIL_REGEXP.test(c.value)
    ? null
    : {
        email: {
          value: c.value
        }
      };
}
