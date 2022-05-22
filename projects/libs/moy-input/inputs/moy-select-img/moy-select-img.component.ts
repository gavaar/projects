import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { SelectImageInterface } from '.';
import { MoySelectImage } from './moy-select-img';

@Component({
  selector: 'moy-select-img',
  templateUrl: './moy-select-img.component.html',
  styleUrls: ['./moy-select-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoySelectImageComponent {
  @Input() config: MoySelectImage;

  private _showOptions = new BehaviorSubject(false);

  showOptions = this._showOptions.asObservable().pipe(
    delay(1),
    tap(expanded => expanded && this.anyClickCloses()),
  );

  selectOptionFn = (index: number) => index;

  toggleOpen(): void {
    this._showOptions.next(!this._showOptions.value);
  }

  onSelectOption(option: SelectImageInterface['options']): void {
    this.config.control.setValue(option);
  }

  private anyClickCloses(): void {
    const closer = () => {
      document.removeEventListener('click', closer);
      this._showOptions.next(false);
    };

    document.addEventListener('click', closer);
  }
}
