import { ImageDataService } from './image-data.service';
import { ImageStorageService } from './image-storage.service';

export const IMAGE_DATA_PROVIDERS = [
  ImageDataService,
  ImageStorageService,
];
