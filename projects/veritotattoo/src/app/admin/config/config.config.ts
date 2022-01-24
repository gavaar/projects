import { MoyColorpicker, MoyInput, MoySelectImage, MoyTextarea } from '@libs/moy-input';
import { HEADER, BODY, SECTIONS, COLORS } from '../admin.config';

export enum EditTabs {
  None = 'none',
  Header = 'header',
  Body = 'body',
  Sections = 'sections',
  Colors = 'colors',
}

// TEMP DELETE
const TEMP_IMAGE_OPTIONS = [{
    src: HEADER.picture,
    value: HEADER.picture
  },
  {
    src: SECTIONS.design,
    value: SECTIONS.design,
  },
  {
    src: SECTIONS.tattoo,
    value: SECTIONS.tattoo,
}];
// -----

export const SELECTED_VALUES = {
  [EditTabs.Header]: {
    header_picture: HEADER.picture,
  },
  [EditTabs.Body]: {
    body_title: BODY.title,
    body_text: BODY.text,
  },
  [EditTabs.Sections]: {
    sections_tattoo: SECTIONS.tattoo,
    sections_design: SECTIONS.design,
  },
  [EditTabs.Colors]: {
    colors_primary: COLORS.primary,
    colors_secondary: COLORS.secondary,
    colors_accent: COLORS.accent,
    colors_background: COLORS.background,
    colors_text: COLORS.text,
  }
}

export const INPUT_CONFIGS = (values = {}) => ({
  [EditTabs.Header]: {
    title: 'Headers',
    inputs: [
      new MoySelectImage({ label: 'Profile picture',
        id: 'header_picture',
        value: values[EditTabs.Header].header_picture,
        options: TEMP_IMAGE_OPTIONS,
      }),
    ],
  },
  [EditTabs.Body]: {
    title: 'Body',
    inputs: [
      new MoyInput({ label: 'Title', id: 'body_title', value: values[EditTabs.Body].body_title }),
      new MoyTextarea({ label: 'Text', id: 'body_text', value: values[EditTabs.Body].body_text }),
    ],
  },
  [EditTabs.Sections]: {
    title: 'Sections',
    inputs: [
      new MoySelectImage({
        label: 'Design background',
        id: 'sections_design',
        value: values[EditTabs.Sections].sections_design,
        options: TEMP_IMAGE_OPTIONS,
      }),
      new MoySelectImage({
        label: 'Tattoo background',
        id: 'sections_tattoo',
        value: values[EditTabs.Sections].sections_tattoo,
        options: TEMP_IMAGE_OPTIONS,
      }),
    ],
  },
  [EditTabs.Colors]: {
    title: 'Colors',
    inputs: Object.keys(COLORS).map(color => {
      return new MoyColorpicker({ label: color, id: `colors_${color}`, value: values[EditTabs.Colors][`colors_${color}`] });
    }),
  }
});
