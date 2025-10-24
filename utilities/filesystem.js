import { Store } from "./store.js";

export class FileSystemStore extends Store {
  constructor(initialState = {}) {
    super({ ...initialState, root: null });
  }

  async pickRoot() {
    this.root = await window.showDirectoryPicker();
  }

  async pickFile(description, allowedTypes = []) {
    await this.#validateRoot();

    const types = {
      description,
      accept: { "*/*": allowedTypes },
      excludeAcceptAllOption: true,
    };

    const filePickerOptions = { types: [types], startIn: this.root };
    const fileHandles = await window.showOpenFilePicker(filePickerOptions);
    const pickedFileHandle = fileHandles.at(0);

    await this.#validateFileHandle(pickedFileHandle);
    return pickedFileHandle;
  }

  async getFileName() {
    return fileHandle.name;
  }

  async getFileDirectory(fileHandle) {
    const path = await this.getFilePath(fileHandle);
    return path.slice(0, -1).join("/");
  }

  async getFilePath(fileHandle) {
    await this.#validateRoot();
    return this.root.resolve(fileHandle);
  }

  async getFileContents(fileHandle) {
    return new Promise(async (resolve) => {
      if (fileHandle === null) {
        resolve(null);
      }

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        resolve(fileReader.result);
      });

      try {
        const fileObject = await fileHandle.getFile();
        fileReader.readAsText(fileObject);
      } catch {}
    });
  }

  async findFile(path) {
    return this.#findFileInDirectory(path, this.root);
  }

  async #validateRoot() {
    if (this.root === null) {
      throw new Error("Root directory is not set");
    }
  }

  async #validateFileHandle(fileHandle) {
    await this.#validateRoot();

    if (this.root.resolve(fileHandle) === null) {
      throw new Error("File must be in filesystem root");
    }
  }

  async #findFileInDirectory(path, directory) {
    const [entryPath, ...remainingPath] = path.split("/");

    if (remainingPath.length === 0) {
      return directory.getFileHandle(entryPath);
    }
    const nextDirectory = await directory.getDirectoryHandle(entryPath);
    return this.#findFileInDirectory(remainingPath.join("/"), nextDirectory);
  }
}
