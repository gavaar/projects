import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { MoySelectIcon } from './moy-select-icon';
import { MoySelectIconService } from './moy-select-icon.service';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'moy-select-icon',
  templateUrl: './moy-select-icon.component.html',
  styleUrls: ['./moy-select-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoySelectIconComponent implements OnInit {
  @Input() config: MoySelectIcon;

  searcher = new FormControl('');

  private _showOptions = new BehaviorSubject(false);
  private _destroy$ = new AsyncSubject();

  showOptions = this._showOptions.asObservable().pipe(
    delay(1),
    tap(expanded => {
      if (expanded) {
        this.searcher.patchValue('');
        this.anyClickCloses();
      }
    }),
  );

  constructor(public moySelectIconService: MoySelectIconService) {}

  ngOnInit(): void {
    this.moySelectIconService.searchFor();
    this.searcher.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(val => {
      this.moySelectIconService.searchFor(val);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  selectOptionFn = (_i, option: number) => option;

  toggleOpen(): void {
    this._showOptions.next(!this._showOptions.value);
  }

  onSelectOption(option: string): void {
    this.config.control.setValue(option);
  }

  private anyClickCloses(): void {
    const closer = (event) => {
      if (event.target.className.includes('MoySelectIcon__search')) {
        return;
      }
      document.removeEventListener('click', closer);
      this._showOptions.next(false);
    };

    document.addEventListener('click', closer);
  }
}
