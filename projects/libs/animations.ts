import { animate, state, style, transition, trigger } from '@angular/animations';

const verticalExpandCollapse = trigger('verticalExpandCollapse', [
  state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0, 'padding-top': 0, 'padding-bottom': 0 })),
  state('expanded', style({ height: '*', opacity: 1 })),
  transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

const slideDown = trigger('slideDown', [
  state('void', style({ height: '0' })),
  state('*', style({ height: '*' })),
  transition('void <=> *', animate('0.15s cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

const popOut = trigger('popOut', [
  state('void', style({ transform: 'scale(0.25)' })),
  state('*', style({ transform: 'scale(1)' })),
  transition('void <=> *', animate('0.75s cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export { verticalExpandCollapse, slideDown, popOut };
