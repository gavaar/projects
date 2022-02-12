import { AppConfig, AppConfigForm, AppConfigSections, RawConfig } from '@vero-components/app-config';
import { BehaviorSubject } from 'rxjs';
import { propHasChanged, createInputConfig } from './changes-cache.helpers';

export class ConfigUpdatesCache {
  originalValues: AppConfig;
  inputConfig: AppConfigForm;

  private imageOptions = [];

  private _selectedValues: AppConfig;
  get selectedValues(): AppConfig {
    return this._selectedValues;
  };
  set selectedValues(c: AppConfig) {
    this._selectedValues = c;
    const changesFound = propHasChanged(this.selectedValues, this.originalValues);
    this._hasChange$.next(changesFound);
  }

  get rawValues(): RawConfig {
    return {
      ...this._selectedValues,
      [AppConfigSections.Header]: {
        profile: this._selectedValues[AppConfigSections.Header].profile.value
      },
      [AppConfigSections.Sections]: {
        tattoo: this._selectedValues[AppConfigSections.Sections].tattoo.value,
        design: this._selectedValues[AppConfigSections.Sections].design.value,
      }
    }
  }

  private _hasChange$ = new BehaviorSubject(false);
  readonly hasChange$ = this._hasChange$.asObservable();

  constructor(initValues: AppConfig) {
    this.originalValues = initValues;
    this.selectedValues = initValues;
    this.inputConfig = createInputConfig(initValues, this.imageOptions);
  }

  commitChanges(): void {
    this.originalValues = { ...this.selectedValues };
    this._hasChange$.next(false);
  }

  addImageOptions(options: { src: string; value: string }[]): void {
    this.imageOptions.push(...options);
  }
}
