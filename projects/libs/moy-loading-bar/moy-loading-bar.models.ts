import { BehaviorSubject } from 'rxjs';

interface LoadingBarConfig {
  total?: number;
  title?: string;
  loaded?: number;
  loading?: number;
  hideTotal?: boolean;
}

class AbstractMoyLoadingBar {
  title?: string;
  total: number;
  loaded: number;
  loading: number;
  hideTotal: boolean;
  proportion$ = new BehaviorSubject<{ [key in 'loading' | 'loaded' | 'rest']?: number }>({});

  constructor(config: LoadingBarConfig = {}) {
    this.title = config.title;
    this.total = config.total || 0;
    this.loaded = config.loaded || 0;
    this.loading = config.loading || 0;
    this.hideTotal = config.hideTotal || false;
    this.calculateProportions();
  }

  setNewTotal(newT: number) {
    this.total = newT;
    this.calculateProportions();
  }

  setLoaded(newL: number) {
    this.loaded = newL;
    this.calculateProportions();
  }

  setLoading(newL: number) {
    const _rest = this.total - this.loaded;
    this.loading = newL > _rest ? _rest : newL;
    this.calculateProportions();
  }

  private calculateProportions() {
    this.proportion$.next({
      loaded: ((this.loaded - (this.loading > 0 ? 0 : this.loading * -1)) / this.total) * 100,
      loading: ((this.loading > 0 ? this.loading : this.loading * -1) / this.total) * 100,
      rest: ((this.total - (this.loading > 0 ? this.loading : 0) - this.loaded) / this.total) * 100,
    });
  }
}

class MoyLoadingBar extends AbstractMoyLoadingBar {}

export { AbstractMoyLoadingBar, MoyLoadingBar };
