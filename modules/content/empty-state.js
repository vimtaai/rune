import { workspace } from "../../stores/workspace.js";

export default ({ emptyState, openButton }) => {
  workspace.addEventListener("root", () => {
    emptyState.hidden = !workspace.root;
  });

  openButton.addEventListener("click", () => {
    workspace.pickWorkspace();
  });
};
