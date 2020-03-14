export default class Storage {
  constructor(key, storage = localStorage) {
    this.key = key;
    this.storage = storage;
  }

  setItem(value) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  getItem() {
    const result = this.storage.getItem(this.key);

    try {
      return JSON.parse(result);
    } catch (error) {}
  }

  removeItem() {
    this.storage.removeItem(this.key);
  }
}
