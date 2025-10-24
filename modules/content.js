import { workspaceDatabase } from "../databases/workspace.js";
import { workspace as workspaceStore } from "../stores/workspace.js";

export default () => {
  workspaceDatabase.getItem("handles", "root").then((root) => {
    workspaceStore.root = root;
  });
};
