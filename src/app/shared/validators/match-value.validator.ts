import { FormGroup } from '@angular/forms';

export function matchValidator(group: FormGroup) {
  const values = Object.keys(group.controls)
    .map(key => group.get(key).value)
    .filter((value, index, self) => self.indexOf(value) === index);

  if (values.length === 1) {
    return null;
  }

  return {
    different: true
  };
}
