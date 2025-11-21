import { workspace as workspaceStore } from "../stores/workspace.js";

export default ({ refreshButton }) => {
  workspaceStore.addEventListener("root", async function onWorkspaceChange() {
    refreshButton.disabled = !workspaceStore.root;
  });

  window.addEventListener("keydown", onReloadShortcut);

  refreshButton.addEventListener("click", function onRefreshButtonClick() {
    workspaceStore.toggleRefresh();
  });

  function onReloadShortcut(event) {
    const { ctrlKey, altKey, shiftKey, metaKey, code } = event;

    const isModifierCorrect = ctrlKey && !altKey && !shiftKey && !metaKey;
    const isKeyCorrect = code === "KeyR";

    if (!isKeyCorrect || !isModifierCorrect) {
      return;
    }

    event.preventDefault();
    workspaceStore.toggleRefresh();
  }
};
