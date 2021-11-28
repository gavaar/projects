import { SafeUrl } from '@angular/platform-browser';

export const imgRegex = /.jpg|.png|.jpeg/;

export type ImgType = 'base' | 'design' | 'tattoo';

export interface ImageData {
  file: File;
  folder: ImgType;
  available: boolean;
  id?: number;
  description?: string;
  imageUrl?: string | SafeUrl;
}
