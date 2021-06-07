
export class DynamicHeaderDimensions {
  headerShrinkPercentage = 0;
  borderRadius = '0% 0% 50% 50%';
  imageHeight = '7.5rem';

  onScroll(event: any) {
    this.headerShrinkPercentage = this.headerShrinkValue(event.target);
    this.borderRadius = this.borderRadiusValue(this.headerShrinkPercentage);
    this.imageHeight = this.imageHeightValue(this.headerShrinkPercentage);
  }

  private headerShrinkValue({ scrollTop, clientHeight, scrollHeight }): number {
    const scrollableHeight = scrollHeight - clientHeight;
    const headerShrinkPercentage = scrollTop * 1.5 / scrollableHeight;
    return this.maximumOfOneForShrinkPercentage({ headerShrinkPercentage, scrollableHeight });
  }

  private maximumOfOneForShrinkPercentage({ headerShrinkPercentage, scrollableHeight }): number {
    if (!scrollableHeight) return 0;
    if (headerShrinkPercentage > 1) return 1;
    return headerShrinkPercentage;
  }

  private borderRadiusValue(shrinkPercentage: number): string {
    const borderRadiusPercentage = 50 - 50 * shrinkPercentage;
    return `0% 0% ${borderRadiusPercentage}% ${borderRadiusPercentage}%`;
  }

  private imageHeightValue(shrinkPercentage: number): string {
    return `${7.5 - (4 * shrinkPercentage)}rem`;
  }
}
