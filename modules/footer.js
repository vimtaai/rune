import { workspace } from "../stores/workspace.js";

export default ({ refreshButton }) => {
  workspace.addEventListener("root", async function onWorkspaceChange() {
    refreshButton.disabled = !workspace.root;
  });

  window.addEventListener("keydown", onReloadShortcut);

  refreshButton.addEventListener("click", function onRefreshButtonClick() {
    workspace.toggleRefresh();
  });

  function onReloadShortcut(event) {
    const { ctrlKey, altKey, shiftKey, metaKey, code } = event;

    const isModifierCorrect = ctrlKey && !altKey && !shiftKey && !metaKey;
    const isKeyCorrect = code === "KeyR";

    if (!isKeyCorrect || !isModifierCorrect) {
      return;
    }

    event.preventDefault();
    workspace.toggleRefresh();
  }
};
