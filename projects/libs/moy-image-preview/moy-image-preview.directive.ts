import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoyImagePreviewCacheService } from './moy-image-preview-cache.service';
import { MoyImagePreviewComponent } from './moy-preview/moy-image-preview.component';
import { MoyImageIntersectionObserver } from './moy-image.intersection-observer';

const TINY_GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

function createImageOnCanvas(img: HTMLImageElement, cache: MoyImagePreviewCacheService, previewHeight = 120): string {
  const { width, height } = img;
  const canvas = document.createElement("canvas");
  const ratio = width / height;

  canvas.height = previewHeight;
  canvas.width = canvas.height * ratio;

  const context = canvas.getContext("2d");
  context.scale(canvas.width / width, canvas.height / height);
  context.drawImage(img, 0, 0);

  cache.set(img.src, previewHeight, canvas.toDataURL('img/jpeg'));
  return cache.get(img.src, previewHeight);
}
function setElementDimensions(element: HTMLImageElement, previewHeight = 120): void {
  element.height = previewHeight;
  element.width = previewHeight * 5 / 4;
}
function setLoading(element: HTMLImageElement) {
  element.src = TINY_GIF;
  element.className = element.className + ' img-loading';
}
function setImage(element: HTMLImageElement, src: string) {
  element.setAttribute('data-src', src);
  element.className = element.className.split(' img-loading')[0];
  MoyImageIntersectionObserver.observe(element);
}

@Directive({
  selector: 'img[moy-preview]',
})
export class MoyImagePreviewDirective implements OnInit {
  @Input('moy-preview') previewHeight: number;
  @Input('no-expand') noExpand: boolean;

  private _imgSrc = '';

  constructor(private el: ElementRef<HTMLImageElement>, private dialog: MatDialog, private cache: MoyImagePreviewCacheService) {}

  ngOnInit() {
    this._imgSrc = this.el.nativeElement.src;
    const cachedUrl = this.cache.get(this._imgSrc, this.previewHeight);
    setElementDimensions(this.el.nativeElement, this.previewHeight);

    if (cachedUrl) {
      setImage(this.el.nativeElement, cachedUrl);
    } else {
      this.loadLowResImage();
    }
  }

  @HostListener('click')
  onClick() {
    if (this.noExpand) return;
    this.dialog.open(MoyImagePreviewComponent, { data: this._imgSrc, hasBackdrop: true });
  }

  private loadLowResImage(): void {
    const img = document.createElement('img');
    img.crossOrigin = '*';
    img.onload = () => {
      const canvasUrl = createImageOnCanvas(img, this.cache, this.previewHeight);
      setImage(this.el.nativeElement, canvasUrl);
      img.remove();
    }
    setLoading(this.el.nativeElement);
    img.src = this._imgSrc;
  }
}
