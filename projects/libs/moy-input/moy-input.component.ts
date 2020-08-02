import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractMoyInput } from './moy-input.models';

@Component({
  selector: 'moy-input, moy-input [autofocus]',
  templateUrl: './moy-input.component.html',
  styleUrls: ['./moy-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyInputComponent implements OnInit, OnDestroy {
  @Input() config: AbstractMoyInput<any>;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLElement>;

  error: string;

  private _destroy$ = new Subject();

  ngOnInit() {
    this.config.setFocus = () => this.focusInput();
    this.config.control.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(status => {
      if (status === 'INVALID') {
        this.error = (() => {
          const errorKey = Object.keys(this.config.control.errors)[0];
          return errors[errorKey];
        })();
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}

const errors = {
  required: 'Field is required',
};
