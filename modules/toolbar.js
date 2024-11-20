import { workspace } from "../stores/workspace.js";

export default ({ toolbar }) => {
  workspace.addEventListener("root", onWorkspaceChange);

  async function onWorkspaceChange() {
    toolbar.ariaDisabled = workspace.isOpen;
  }
};
