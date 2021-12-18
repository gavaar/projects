
export enum DisplayView {
  New = 'newImages',
  Old = 'oldImages',
}

export class DisplayManager {
  displayView: DisplayView = DisplayView.Old;

  selectDisplay(view: DisplayView) {
    this.displayView = view;
  }
}
