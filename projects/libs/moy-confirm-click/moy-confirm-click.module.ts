import { Directive, ElementRef, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[confirmClick]',
})
export class MoyConfirmClickDirective {
  @Input() confirmConfig = {
    disableConfirm: false,
    message: 'Are you sure?',
  };
  @Output() confirmClick = new EventEmitter();

  constructor(el: ElementRef) {
    el.nativeElement.onclick = () => {
      if (this.confirmConfig.disableConfirm) {
        return this.confirmClick.emit();
      }

      const result = confirm(this.confirmConfig.message);
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
