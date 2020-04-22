import { animate, state, style, transition, trigger } from '@angular/animations';

const verticalExpandCollapse = trigger('verticalExpandCollapse', [
  state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0, 'padding-top': 0, 'padding-bottom': 0 })),
  state('expanded', style({ height: '*', opacity: 1 })),
  transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export { verticalExpandCollapse };
