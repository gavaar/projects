export class LocalStorageManager {
  constructor(private uri: string) {}

  get(): JSON {
    return JSON.parse(localStorage.getItem(this.uri)) || {};
  }

  set(resource: object) {
    localStorage.setItem(this.uri, JSON.stringify(resource));
  }

  patch(resource: object) {
    const object = { ...this.get(), ...resource };
    this.set(object);
  }
}