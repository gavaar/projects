import { MoyColorpicker, MoyInput, MoySelectImage, MoyTextarea } from '@libs/moy-input';
import { AppConfig, AppConfigForm, AppConfigSections } from '@vero-components/app-config';

export const createInputConfig = (values: AppConfig, imageOptions: { src: string; value: string }[]): AppConfigForm => ({
  [AppConfigSections.Header]: {
    title: 'Headers',
    inputs: [
      new MoySelectImage({
        label: 'Profile picture',
        id: 'profile',
        value: values[AppConfigSections.Header].profile,
        options: imageOptions,
      }),
    ],
  },
  [AppConfigSections.Body]: {
    title: 'Body',
    inputs: [
      new MoyInput({ label: 'Title', id: 'title', value: values[AppConfigSections.Body].title }),
      new MoyTextarea({ label: 'Text', id: 'text', value: values[AppConfigSections.Body].text }),
    ],
  },
  [AppConfigSections.Sections]: {
    title: 'Sections',
    inputs: [
      new MoySelectImage({
        label: 'Design background',
        id: 'design',
        value: values[AppConfigSections.Sections].design,
        options: imageOptions,
      }),
      new MoySelectImage({
        label: 'Tattoo background',
        id: 'tattoo',
        value: values[AppConfigSections.Sections].tattoo,
        options: imageOptions,
      }),
    ],
  },
  [AppConfigSections.Colors]: {
    title: 'Colors',
    inputs: Object.keys(values[AppConfigSections.Colors]).map(color => {
      return new MoyColorpicker({ label: color, id: color, value: values[AppConfigSections.Colors][color] });
    }),
  }
});

export function propHasChanged(currentConfig: AppConfig, initConfig: AppConfig): boolean {
  const currentProps = Object.keys(currentConfig);
  const changesFound = currentProps.find(k => {
    if (typeof currentConfig[k] === 'string') {
      return initConfig[k] !== currentConfig[k];
    } else {
      return propHasChanged(currentConfig[k], initConfig[k]);
    }
  }) != null;
  return changesFound;
}
