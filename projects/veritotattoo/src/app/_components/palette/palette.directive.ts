import { Directive, ElementRef, Input } from '@angular/core';
import { defaultRGBColors, defaultVariableStyles } from './palette.config';
import { CssVariableConfiguration } from './palette.models';

@Directive({
  selector: '[veroPalette]',
})
export class PaletteDirective {
  @Input() readonly veroPalette = {};

  constructor(el: ElementRef) {
    this.appendCssStyleToElement({ config: { ...defaultRGBColors, ...this.veroPalette }, type: 'rgb' }, el);
    this.appendCssStyleToElement({ config: defaultVariableStyles, type: 'var' }, el);
  }

  private appendCssStyleToElement(css: { config: CssVariableConfiguration; type: 'rgb' | 'var' }, el: ElementRef): void {
    const { config, type } = css;

    Object.keys(config).forEach((propKey: string) => {
      const cssVariableValue = this.getCssValueByType(type, config[propKey]);
      const cssVariableKey = `--${propKey}`;
      el.nativeElement.style.setProperty(cssVariableKey, cssVariableValue);
    });
  }

  private getCssValueByType(type: 'rgb' | 'var', value: string): string {
    return type === 'rgb' ? `rgb(${value})` : `var(--${value})`;
  }
}
