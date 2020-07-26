interface LoadingBarConfig {
  total: number;
  title?: string;
  loaded?: number;
  loading?: number;
}

class AbstractMoyLoadingBar {
  title?: string;
  total: number;
  loaded: number;
  loading?: number;
  proportions: { [key: string]: number };

  constructor(config: LoadingBarConfig) {
    this.title = config.title;
    this.total = config.total || 100;
    this.loaded = config.loaded || 0;
    this.loading = config.loading || 0;
    this.calculateProportions();
  }

  calculateProportions() {
    this.proportions = {
      loaded: ((this.loaded - (this.loading > 0 ? 0 : this.loading * -1)) / this.total) * 100,
      loading: ((this.loading > 0 ? this.loading : this.loading * -1) / this.total) * 100,
      rest: ((this.total - (this.loading > 0 ? this.loading : 0) - this.loaded) / this.total) * 100,
    };
  }
}

class MoyLoadingBar extends AbstractMoyLoadingBar {}

export { AbstractMoyLoadingBar, MoyLoadingBar };
