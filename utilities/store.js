export class Store extends EventTarget {
  #state = {};

  constructor(initialState = {}) {
    super();

    for (const [key, value] of Object.entries(initialState)) {
      this.#state[key] = value;
      this.#defineAccessors(key);
    }
  }

  #defineAccessors(key) {
    Object.defineProperty(this, key, {
      get: () => {
        const value = Reflect.get(this.#state, key);
        return typeof value === "function" ? value.bind(this) : value;
      },
      set: (newValue) => {
        Reflect.set(this.#state, key, newValue);
        this.dispatchEvent(new CustomEvent(key));
      },
    });
  }
}
