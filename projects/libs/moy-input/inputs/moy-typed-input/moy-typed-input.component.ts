import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractMoyInput } from '../input.abstract';

@Component({
  selector: 'moy-typed-input',
  templateUrl: './moy-typed-input.component.html',
  styleUrls: ['./moy-typed-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyTypedInputComponent implements OnInit {
  @Input() config: AbstractMoyInput<any>;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLElement>;

  ngOnInit() {
    this.config.setFocus = () => this.focusInput();
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}
