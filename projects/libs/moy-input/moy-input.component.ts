import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractMoyInput } from './inputs/input.abstract';
import { InputType } from './inputs/models';

@Component({
  selector: 'moy-input, moy-input [autofocus]',
  templateUrl: './moy-input.component.html',
  styleUrls: ['./moy-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyInputComponent implements OnInit, OnDestroy {
  @Input() config: AbstractMoyInput<any>;
  @Output() onChange = new EventEmitter();

  error: string;
  InputType = InputType;

  private _destroy$ = new AsyncSubject<void>();

  ngOnInit() {
    this.config.control.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.onChange.emit(value);
    });
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
}

const errors = {
  required: 'Field is required',
};
