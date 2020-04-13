import { animate, state, style, transition, trigger } from '@angular/animations';

const verticalExpandCollapse = trigger('verticalExpandCollapse', [
  state('void', style({ height: '0px', minHeight: '0', opacity: 0, padding: 0 })),
  state('*', style({ height: '*', opacity: 1 })),
  transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export { verticalExpandCollapse };
