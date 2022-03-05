import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConfigSections } from '@vero-components/app-config';

@Component({
  selector: 'elements-preview',
  templateUrl: './elements-preview.component.html',
  styleUrls: ['./elements-preview.component.scss', '../../../_styles/_home.common.scss', '../../../_styles/_header.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsPreviewComponent {
  @Input() values: { [tab: string]: { [key: string]: any } } = {};
  @Input() selected: AppConfigSections | null;
  @Output() onSelect = new EventEmitter<AppConfigSections>();

  AppConfigSections = AppConfigSections;

  iconFn = (_i, icon) => icon;

  selectSection(tab: AppConfigSections) {
    this.onSelect.emit(tab);
  }
}
