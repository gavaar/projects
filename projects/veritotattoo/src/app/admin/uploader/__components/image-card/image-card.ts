import { SafeUrl } from '@angular/platform-browser';
import { MoyInput, MoySelect, MoyToggle } from '@libs/moy-input';
import { ImageData } from '@vero-components/image-storage';
import { LABELS, SELECT_OPTIONS } from '../image-manager/new-images.config';

export type CardImageData = Pick<ImageData, 'imageUrl' | 'folder' | 'description' | 'available'>;

export default class ImageCard {
  imageUrl: string | SafeUrl = '';
  available = new MoyToggle({ label: LABELS.available });
  description = new MoyInput({ label: LABELS.description });
  folder = new MoySelect({ label: LABELS.folder, selectOptions: SELECT_OPTIONS });

  get value(): ImageData {
    return {
      ...this._imageData,
      available: this.available.control.value,
      folder: this.folder.control.value,
      description: this.description.control.value,
      imageUrl: this.imageUrl,
    }
  }

  private _imageData: ImageData;

  constructor(cardData: ImageData) {
    this._imageData = cardData;
    this.imageUrl = cardData.imageUrl;
    this.patchData(cardData);
  }

  patchData(data: CardImageData): void {
    const { available, folder, description } = data;
    if (available != null) this.available.patchValue(available);
    if (folder != null) this.folder.patchValue(folder);
    if (description != null) this.description.patchValue(description);
  }
}
