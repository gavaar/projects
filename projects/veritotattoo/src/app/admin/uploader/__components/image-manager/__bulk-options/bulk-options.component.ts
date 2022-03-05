import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { MoyInput, MoySelect, MoyToggle } from '@libs/moy-input';
import { ImageData } from '@vero-components/image-storage';
import { AsyncSubject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SELECT_OPTIONS } from '../new-images.config';

@Component({
  selector: 'bulk-options',
  templateUrl: './bulk-options.component.html',
  styleUrls: ['./bulk-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkOptionsComponent implements OnInit, OnDestroy {
  @Output() onBulkChange = new EventEmitter<Partial<Pick<ImageData, 'folder' | 'available' | 'description'>>>();

  applyButton = new MoyButton({ text: 'Apply' });

  description = new MoyInput({ label: 'Description', value: 'Description' });
  available = new MoyToggle({ label: 'For sale?', value: false });
  folder = new MoySelect({ label: 'Show where?', selectOptions: SELECT_OPTIONS, value: '-' });

  private destroy$ = new AsyncSubject<void>();

  ngOnInit() {
    this.subscribeToChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToChanges() {
    ['description', 'available', 'folder'].forEach(input => {
      this[input].control.valueChanges
        .pipe(takeUntil(this.destroy$), debounceTime(500))
        .subscribe(value => this.onBulkChange.emit({ [input]: value }));
    });
  }
}
