import { Injectable } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateESParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    const [day, month, year] = value.split('/').map(n => parseInt(n, 0));
    return new NgbDate(year, month, day);
  }

  format(date: NgbDateStruct): string {
    if (null === date) {
      return '';
    }
    const d = new Date(date.year, date.month, date.day);
    return [
      this.pad(d.getDate()),
      this.pad(d.getMonth()),
      d.getFullYear()
    ].join('/');
  }

  pad(s: number) {
    return s < 10 ? '0' + s : s;
  }
}
