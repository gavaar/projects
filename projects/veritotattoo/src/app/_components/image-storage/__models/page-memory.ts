export class PageMemory<T> {
  private memory = new Map<number, T>();

  get(page: number): T {
    return this.memory.get(page);
  }

  set(page: number, imageData: T): void {
    this.memory.set(page, imageData);
  }
}
