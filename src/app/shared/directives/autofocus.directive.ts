import { Directive, AfterContentInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {
  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    setTimeout(() => this.el.nativeElement.focus());
  }
}
