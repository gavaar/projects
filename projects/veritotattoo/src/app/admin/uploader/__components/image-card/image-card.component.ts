import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import ImageCard from './image-card';

@Component({
  selector: 'image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent implements OnInit, OnDestroy {
  @Input() imageCard: ImageCard;

  @Output() cardUpdate = new EventEmitter<void>();

  cardChanges: Observable<ImageCard['value']>;
  
  private cardGroup: FormGroup;
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.cardGroup = this.buildFormGroup();
    this.cardChanges = this.cardGroup.valueChanges.pipe(
      takeUntil(this._destroy$),
      startWith(this.imageCard.value),
    );
    this.cardChanges.subscribe(() => this.cardUpdate.emit());
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private buildFormGroup(): FormGroup {
    return new FormGroup({
      folder: this.imageCard.folder.control,
      available: this.imageCard.available.control,
      description: this.imageCard.description.control,
    });
  }
}
