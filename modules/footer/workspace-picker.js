import { workspace as workspaceStore } from "/stores/workspace.js";

export default ({ workspaceButton, workspaceName }) => {
  workspaceStore.addEventListener("root", async () => {
    workspaceName.textContent = workspaceStore.root?.name || "N/A";
  });

  workspaceButton.addEventListener("click", () => {
    workspaceStore.pickWorkspace();
  });
};
