import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoyImagePreviewCacheService } from './moy-image-preview-cache.service';
import { MoyImagePreviewComponent } from './moy-preview/moy-image-preview.component';

const TINY_GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

@Directive({
  selector: 'img[moy-preview]',
})
export class MoyImagePreviewDirective implements OnInit {
  @Input('moy-preview') previewHeight: number;
  @Input('no-expand') noExpand: boolean;

  private _imgSrc = '';

  constructor(private el: ElementRef<HTMLImageElement>, private dialog: MatDialog, private cache: MoyImagePreviewCacheService) {}

  ngOnInit() {
    const cachedUrl = this.cache.get(this.el.nativeElement.src, this.previewHeight);
    if (cachedUrl) {
      this._imgSrc = this.el.nativeElement.src;
      this.setImage(cachedUrl);
    } else {
      const img = document.createElement('img');
      img.crossOrigin = '*';
      img.onload = () => {
        const canvasUrl = this.createImageOnCanvas(img);
        this.setImage(canvasUrl);

        this._imgSrc = img.src;
        img.remove();
      }
      img.src = this.el.nativeElement.src;
      this.setLoading();
    }

    this.setElementDimensions();
  }

  @HostListener('click')
  onClick() {
    if (this.noExpand) return;
    this.dialog.open(MoyImagePreviewComponent, { data: this._imgSrc, hasBackdrop: true });
  }

  private createImageOnCanvas(img: HTMLImageElement): string {
    const cachedUrl = this.cache.get(img.src, this.previewHeight);
    if (cachedUrl) return cachedUrl;

    const _previewHeight = this.previewHeight || 120;

    const { width, height } = img;
    const canvas = document.createElement("canvas");
    const ratio = width / height;

    canvas.height = _previewHeight;
    canvas.width = canvas.height * ratio;

    const context = canvas.getContext("2d");
    context.scale(canvas.width / width, canvas.height / height);
    context.drawImage(img, 0, 0);

    this.cache.set(img.src, this.previewHeight, canvas.toDataURL('img/jpeg'));
    return this.cache.get(img.src, this.previewHeight);
  }

  private setElementDimensions() {
    const _previewHeight = this.previewHeight || 120;
    this.el.nativeElement.height = _previewHeight;
    this.el.nativeElement.width = _previewHeight * 5 / 4;
  }

  private setLoading() {
    this.el.nativeElement.src = TINY_GIF;
    this.el.nativeElement.className = this.el.nativeElement.className + ' img-loading';
  }

  private setImage(src: string) {
    this.el.nativeElement.src = src;
    this.el.nativeElement.className = this.el.nativeElement.className.split(' img-loading')[0];
  }
}
