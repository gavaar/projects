import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter,  } from '@angular/core';
import { ImageData } from '@vero-components/image-storage';
import ImageOption from './image-option';

@Component({
  selector: 'image-options',
  templateUrl: './image-options.component.html',
  styleUrls: ['./image-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesOptionsComponent {
  @Input() options: ImageOption[];

  @Output() onUpdate = new EventEmitter<ImageOption[]>();

  optionFn = (index, option: ImageOption) => option.imageData.imageUrl;

  onBulkChange(changes: ImageData): void {
    const newOptions = this.options;
    newOptions.filter(opt => opt.selected).forEach(o => o.onDataUpdate(changes));
    this.onUpdate.emit(newOptions);
  }

  onCardUpdate() {
    this.onUpdate.emit(this.options);
  }

  onDelete(index: number): void {
    this.onUpdate.emit(this.options.filter((o, i) => i !== index));
  }
}
