import { State } from "../lib/state.js";
import {
  getFilePath,
  pickDirectory,
  pickFileFromDirectory,
} from "../utilities/file-system.js";

export const workspace = new State({
  root: null,
  document: null,
  stylesheet: null,

  get isOpen() {
    return this.root !== null;
  },

  async getDocumentPath() {
    if (this.document === null) {
      return [];
    }

    const fullPath = await getFilePath(this.document, this.root);
    return fullPath.slice(0, -1);
  },

  async pickWorkspace() {
    this.root = await pickDirectory();
  },

  async pickDocument() {
    this.document = await pickFileFromDirectory({
      directory: this.root,
      description: "Documents",
      types: [".html"],
    });
  },

  async pickStylesheet() {
    this.stylesheet = await pickFileFromDirectory({
      directory: this.root,
      description: "Stylesheets",
      types: [".css"],
    });
  },

  toggleRefresh() {
    this.document = this.document;
    this.stylesheet = this.stylesheet;
  },
});
