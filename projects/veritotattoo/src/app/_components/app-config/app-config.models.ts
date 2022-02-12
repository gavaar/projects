import { AbstractMoyInput, SelectImageInterface } from '@libs/moy-input';

export enum AppConfigSections {
  Header = 'header',
  Body = 'body',
  Sections = 'sections',
  Colors = 'colors',
}

export interface RawConfig {
  [AppConfigSections.Header]: {
    profile: string;
  };
  [AppConfigSections.Body]: {
    title: string;
    text: string;
  };
  [AppConfigSections.Sections]: {
    tattoo: string;
    design: string;
  };
  [AppConfigSections.Colors]: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  }; 
}

export interface AppConfig {
  [AppConfigSections.Header]: {
    profile: SelectImageInterface['options'][any];
  };
  [AppConfigSections.Body]: {
    title: string;
    text: string;
  };
  [AppConfigSections.Sections]: {
    tattoo: SelectImageInterface['options'][any];
    design: SelectImageInterface['options'][any];
  };
  [AppConfigSections.Colors]: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export type AppConfigForm = {
  [key in AppConfigSections]: {
    title: string;
    inputs: AbstractMoyInput<any>[];
  }
}
