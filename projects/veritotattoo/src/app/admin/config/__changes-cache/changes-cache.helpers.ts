import { MoyColorpicker, MoyInput, MoySelectIcon, MoySelectImage, MoyTextarea } from '@libs/moy-input';
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
      new MoySelectImage({
        label: 'Background picture',
        id: 'background',
        value: values[AppConfigSections.Header].background || { value: '', src: '' },
        options: imageOptions,
      }),
      ...values[AppConfigSections.Header].icons.map((value, index) => {
        return [
          new MoySelectIcon({
            value: value.icon,
            label: `icon ${index}`,
            id: `icons_icon_${index}`,
          }),
          new MoyInput({
            value: value.href,
            label: value.href.split(/(?<=\/\/www\.|\/\/(?!www\.))(.+?)\//)[1],
            id: `icon_href_${index}`,
          }),
        ];
      }).flat(),
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

export function getFreshConfig(appConfig: AppConfig): AppConfig {
  return {
    ...appConfig,
    [AppConfigSections.Header]: {
      ...appConfig[AppConfigSections.Header],
      icons: appConfig[AppConfigSections.Header].icons.map(i => ({ ...i })),
    }
  };
}

export function getHeaderValue(header: AppConfig[AppConfigSections.Header]) {
  return Object.keys(header).reduce((selectedHeader, key) => {
    const value = header[key];

    if (key.includes('icons_')) {
      const [prop, index] = key.split('icons_')[1].split('_');
      console.log(prop, index, selectedHeader);
      selectedHeader.icons[index][prop] = value;
      delete selectedHeader[key];
    } else {
      selectedHeader[key] = value;
    }

    return selectedHeader;
  }, header as AppConfig[AppConfigSections.Header]);
}

export function propHasChanged(currentConfig: AppConfig, initConfig: AppConfig): boolean {
  const currentProps = Object.keys(currentConfig);
  const changesFound = currentProps.find(k => {
    if (typeof currentConfig[k] === 'string') {
      return !initConfig || (initConfig[k] !== currentConfig[k]);
    } else if (Array.isArray(currentConfig[k])) {
      return currentConfig[k].find((val, index) => propHasChanged(currentConfig[k][index], initConfig[k][index])) != null;
    } else {
      return propHasChanged(currentConfig[k], initConfig[k]);
    }
  }) != null;
  return changesFound;
}
