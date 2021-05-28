import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[moyScrollbar]',
})
export class MoyScrollbarDirective implements OnDestroy {
  @Output() moyScrollbar = new EventEmitter<any>();

  private destroy$ = new AsyncSubject();

  constructor(private router: Router) {
    window.addEventListener('scroll', (e) => this.handleScroll(e), true);
    this.scrollToTopOnRouting();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private handleScroll(event: any): void {
    if (!event.target.classList.contains('show-scrollbar')) {
      event.target.classList.add('show-scrollbar');
      setTimeout(() => event.target.classList.remove('show-scrollbar'), 500);
    }
    this.moyScrollbar.emit(event);
  }

  private scrollToTopOnRouting(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        document.getElementsByTagName('section')[0].scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
