import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoyImagePreviewComponent } from './moy-preview/moy-image-preview.component';

const TINY_GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

@Directive({
  selector: 'img[moy-preview]',
})
export class MoyImagePreviewDirective implements OnInit {
  @Input('moy-preview') previewHeight;
  @Input('no-expand') noExpand;

  private _imgSrc = '';

  constructor(private el: ElementRef<HTMLImageElement>, private dialog: MatDialog) {}

  ngOnInit() {
    const img = document.createElement('img');
    img.crossOrigin = '*';
    img.onload = () => {
      const canvasUrl = this.createImageOnCanvas(img);
      this.setImage(canvasUrl);

      this._imgSrc = img.src;
      img.remove();
    }
    img.src = this.el.nativeElement.src;

    this.setElementDimensions();
    this.setLoading();
  }

  @HostListener('click')
  onClick() {
    if (this.noExpand) return;
    this.dialog.open(MoyImagePreviewComponent, { data: this._imgSrc, hasBackdrop: true });
  }

  private createImageOnCanvas(img: HTMLImageElement): string {
    const _previewHeight = this.previewHeight || 120;

    const { width, height } = img;
    const canvas = document.createElement("canvas");
    const ratio = width / height;

    canvas.height = _previewHeight;
    canvas.width = canvas.height * ratio;

    const context = canvas.getContext("2d");
    context.scale(canvas.width / width, canvas.height / height);
    context.drawImage(img, 0, 0);

    return canvas.toDataURL('img/jpeg');
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
