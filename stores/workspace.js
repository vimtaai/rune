import { workspaceDatabase } from "../databases/workspace.js";
import { FileSystemStore } from "../utilities/filesystem.js";

export const workspace = new FileSystemStore({
  document: null,
  stylesheet: null,

  async getDocumentPath() {
    return this.getFilePath(this.document);
  },

  async pickWorkspace() {
    this.root = await this.pickRoot();
    this.document = null;
    this.stylesheet = null;
    workspaceDatabase.setItem("handles", "root", this.root);
  },

  async pickDocument() {
    this.document = await this.pickFile("Documents", [".html"]);
  },

  async pickStylesheet() {
    this.stylesheet = await this.pickFile("Stylesheets", [".css"]);
  },

  toggleRefresh() {
    this.document = this.document;
    this.stylesheet = this.stylesheet;
  },
});
