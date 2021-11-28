import { Directive, ElementRef, EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[confirmClick]',
})
export class MoyConfirmClickDirective {
  @Output() confirmClick = new EventEmitter();

  constructor(el: ElementRef) {
    el.nativeElement.onclick = () => {
      const result = confirm('Are you sure?');
      if (result) {
        this.confirmClick.emit();
      }
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [MoyConfirmClickDirective],
  exports: [MoyConfirmClickDirective],
})
export class MoyConfirmClickModule {}
