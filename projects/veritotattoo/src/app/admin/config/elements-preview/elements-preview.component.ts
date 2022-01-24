import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EditTabs } from '../config.config';

@Component({
  selector: 'elements-preview',
  templateUrl: './elements-preview.component.html',
  styleUrls: ['./elements-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsPreviewComponent {
  @Input() values: { [tab: string]: { [key: string]: any } };
  @Input() selected: EditTabs;
  @Output() onSelect = new EventEmitter<EditTabs>();

  EditTabs = EditTabs;

  selectSection(tab: EditTabs) {
    this.onSelect.emit(tab);
  }
}
