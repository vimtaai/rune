import { workspace as workspaceStore } from "/stores/workspace.js";

export default ({ documentButton, documentName }) => {
  workspaceStore.addEventListener("root", async () => {
    documentButton.disabled = !workspaceStore.root;
  });

  workspaceStore.addEventListener("document", () => {
    documentName.textContent = workspaceStore.document?.name || "N/A";
  });

  documentButton.addEventListener("click", () => {
    workspaceStore.pickDocument();
  });
};
