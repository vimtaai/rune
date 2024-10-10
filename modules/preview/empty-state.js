import { workspace } from "../../stores/workspace.js";

export default ({ emptyState, openButton }) => {
  openButton.addEventListener("click", openWorkspace);

  async function openWorkspace() {
    await workspace.pickWorkspace();
    emptyState.hidden = !workspace.isOpen;
  }
};
