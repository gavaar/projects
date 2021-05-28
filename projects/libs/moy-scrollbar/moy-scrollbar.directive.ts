import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[moyScrollbar]',
})
export class MoyScrollbarDirective {
  @Output('moyScrollbar') moyScrollbar = new EventEmitter<any>();

  constructor(el: ElementRef) {
    window.addEventListener('scroll', (e) => this.handleScroll(e), true);
  }

  private handleScroll(event: any): void {
    if (!event.target.classList.contains('show-scrollbar')) {
      event.target.classList.add('show-scrollbar');
      setTimeout(() => event.target.classList.remove('show-scrollbar'), 500);
    }
    this.moyScrollbar.emit(event);
  }
}
