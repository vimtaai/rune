import { workspace } from "../../stores/workspace.js";

export default ({ emptyState, openButton }) => {
  workspace.addEventListener("root", onWorkspaceChange);
  openButton.addEventListener("click", openWorkspace);

  function openWorkspace() {
    workspace.pickWorkspace();
  }

  function onWorkspaceChange() {
    emptyState.hidden = !workspace.isOpen;
  }
};
