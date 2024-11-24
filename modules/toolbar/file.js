import { workspace } from "../../stores/workspace.js";

export default ({
  workspaceButton,
  documentButton,
  stylesheetButton,
  refreshButton,
}) => {
  workspace.addEventListener("root", onWorkspaceChange);
  window.addEventListener("keydown", onReloadShortcut, true);

  workspaceButton.addEventListener("click", onWorkspaceButtonClick);
  documentButton.addEventListener("click", onDocumentButtonClick);
  stylesheetButton.addEventListener("click", onStylesheetButtonClick);
  refreshButton.addEventListener("click", onRefreshButtonClick);

  async function onWorkspaceChange() {
    documentButton.disabled = workspace.isOpen;
    stylesheetButton.disabled = workspace.isOpen;
    refreshButton.disabled = workspace.isOpen;
  }

  function onWorkspaceButtonClick() {
    workspace.pickWorkspace();
  }

  function onDocumentButtonClick() {
    workspace.pickDocument();
  }

  function onStylesheetButtonClick() {
    workspace.pickStylesheet();
  }

  function onRefreshButtonClick() {
    workspace.toggleRefresh();
  }

  function onReloadShortcut(event) {
    const isModifierCorrect =
      event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey;

    if (event.code !== "KeyR" || !isModifierCorrect) {
      return;
    }

    event.preventDefault();
    workspace.toggleRefresh();
  }
};
