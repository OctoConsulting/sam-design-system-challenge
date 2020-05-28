import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[disableSuggestions]'
})
export class DisableSuggestionsDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    const inputs = this.el.nativeElement.querySelectorAll("input[type=search],input[type=text]");
    inputs.forEach(input => {
      input.setAttribute('autocomplete', 'off');
    });
  }
}
