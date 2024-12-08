export class PropertyBasedSet<T> {
  private items: T[] = [];
  private getKey: (item: T) => string;

  constructor(getKey: (item: T) => string, items: T[] = []) {
    this.getKey = getKey;
    for (const item of items) {
      this.add(item);
    }
  }

  add(item: T): void {
    const key = this.getKey(item);
    if (!this.items.some((existing) => this.getKey(existing) === key)) {
      this.items.push(item);
    }
  }

  values(): T[] {
    return [...this.items];
  }

  sorted() {
    return this.values().sort((a, b) => this.getKey(a).localeCompare(this.getKey(b)));
  }
}
