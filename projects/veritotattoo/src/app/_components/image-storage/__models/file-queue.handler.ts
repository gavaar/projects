export class FileQueueHandler {
  private nextIndex = 0;
  private queue: File[] = [];

  next(): File | void {
    const nextFile = this.queue[this.nextIndex];

    if (!nextFile) {
      return;
    }

    this.nextIndex += 1;
    return nextFile;
  }

  add(files: File[]): { queue: File[] } {
    this.queue.push(...files);
    return { queue: this.queue };
  }

  cancel(): void {
    this.queue.length = this.nextIndex - 1;
  }

  private resetQueue(): void {
    this.nextIndex = 0;
    this.queue = [];
  }
}
