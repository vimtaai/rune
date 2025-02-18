export class Database {
  static ID_FIELD = "_id";

  #name = "";
  #version = NaN;
  #stores = null;
  #database = null;

  constructor(name, stores, version = 1) {
    this.#name = name;
    this.#stores = stores;
    this.#version = version;
  }

  async getItem(store, key) {
    await this.#ensureDatabaseIsOpen();

    return new Promise((resolve, reject) => {
      const getRequest = this.#database
        .transaction(store, "readwrite")
        .objectStore(store)
        .get(key);

      getRequest.addEventListener("success", (event) => {
        resolve(getRequest.result);
      });

      getRequest.addEventListener("error", (event) => {
        console.error(event.error);
        reject();
      });
    });
  }

  async setItem(store, key, value) {
    await this.#ensureDatabaseIsOpen();

    return new Promise((resolve, reject) => {
      const setRequest = this.#database
        .transaction(store, "readwrite")
        .objectStore(store)
        .put(value, key);

      setRequest.addEventListener("success", () => {
        resolve();
      });

      setRequest.addEventListener("error", (event) => {
        console.error(event.error);
        reject();
      });
    });
  }

  async #ensureDatabaseIsOpen() {
    if (this.#database) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const readyStatusPromises = [];
      const databaseRequest = window.indexedDB.open(this.#name, this.#version);

      databaseRequest.addEventListener("error", (event) => {
        reject(event.target.error);
      });

      databaseRequest.addEventListener("success", async (event) => {
        await Promise.all(readyStatusPromises);
        this.#database = event.target.result;
        resolve();
      });

      databaseRequest.addEventListener("upgradeneeded", (event) => {
        const database = event.target.result;

        for (const name of this.#stores) {
          const store = database.createObjectStore(name, {
            keyPath: this.ID_FIELD,
          });

          const storeIsReadyPromise = new Promise((resolve) => {
            store.transaction.addEventListener("complete", () => resolve());
          });

          readyStatusPromises.push(storeIsReadyPromise);
        }
      });
    });
  }
}
