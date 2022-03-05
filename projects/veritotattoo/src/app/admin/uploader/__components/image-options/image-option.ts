import { ImageData } from '@vero-components/image-storage';
import { MoyToggle } from '@libs/moy-input';
import ImageCard from '../image-card/image-card';

export default class ImageOption {
  selectedInput = new MoyToggle();
  imageCard: ImageCard;
  
  get imageData(): ImageData {
    return this.imageCard.value;
  };

  get selected(): boolean {
    return this.selectedInput.control.value;
  }
  set selected(b: boolean) {
    this.selectedInput.patchValue(b);
  }

  constructor(data: ImageData, selected = false) {
    this.imageCard = new ImageCard(data);
    this.onSelect(selected);
  }

  onSelect(value = false) {
    this.selected = value;
  }

  onDataUpdate(changes: ImageData) {
    this.imageCard.patchData(changes);
  }
}
