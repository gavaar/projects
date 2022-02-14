import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { defaultHexColors } from './palette.config';
import { CssVariableConfiguration } from './palette.models';

@Directive({
  selector: '[veroPalette]',
})
export class PaletteDirective implements OnChanges {
  @Input() readonly veroPalette = {};

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.appendCssStyleToElement({ ...defaultHexColors, ...this.veroPalette }, this.el);
  }

  private appendCssStyleToElement(css: CssVariableConfiguration, el: ElementRef): void {
    Object.keys(css).forEach((propKey: string) => {
      const cssVariableKey = `--${propKey}`;
      const cssVariableKeyLight = `--${propKey}Light`;
      el.nativeElement.style.setProperty(cssVariableKey, css[propKey]);
      el.nativeElement.style.setProperty(cssVariableKeyLight, `${css[propKey]}54`);
    });
  }
}
