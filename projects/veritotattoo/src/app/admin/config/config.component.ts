import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyButton } from '@libs/moy-button';
import { EditTabs, INPUT_CONFIGS, SELECTED_VALUES } from './config.config';

@Component({
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  backButton = new MoyButton({ text: '👈 Back to admin' });
  selectedSection = EditTabs.None;
  EditTabs = EditTabs;
  selectedValues = SELECTED_VALUES;
  INPUT_CONFIGS = INPUT_CONFIGS(SELECTED_VALUES);

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  onUpdateFormValues(tab: EditTabs, id: string, value: string) {
    this.selectedValues = {
      ...this.selectedValues,
      [tab]: {
        ...this.selectedValues[tab],
        [id]: value,
      }
    }
  }

  onSelectPreview(tab: EditTabs) {
    this.selectedSection = tab === this.selectedSection ? EditTabs.None : tab;
  }
}
