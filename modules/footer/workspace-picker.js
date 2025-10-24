import { workspace } from "../../stores/workspace.js";

export default ({ workspaceButton, workspaceName }) => {
  workspace.addEventListener("root", async () => {
    workspaceName.textContent = workspace.root?.name || "N/A";
  });

  workspaceButton.addEventListener("click", () => {
    workspace.pickRoot();
  });
};
