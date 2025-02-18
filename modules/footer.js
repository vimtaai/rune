import { workspace } from "../stores/workspace.js";

export default ({
  workspaceButton,
  workspaceName,
  documentButton,
  documentName,
  stylesheetButton,
  stylesheetName,
  refreshButton,
}) => {
  workspace.addEventListener("root", onWorkspaceChange);
  workspace.addEventListener("document", onDocumentChange);
  workspace.addEventListener("stylesheet", onStylesheetChange);
  window.addEventListener("keydown", onReloadShortcut, true);

  workspaceButton.addEventListener("click", onWorkspaceButtonClick);
  documentButton.addEventListener("click", onDocumentButtonClick);
  stylesheetButton.addEventListener("click", onStylesheetButtonClick);
  refreshButton.addEventListener("click", onRefreshButtonClick);

  async function onWorkspaceChange() {
    documentButton.disabled = !workspace.root;
    stylesheetButton.disabled = !workspace.root;
    refreshButton.disabled = !workspace.root;

    workspaceName.textContent = workspace.root?.name || "N/A";
  }

  async function onDocumentChange() {
    documentName.textContent = workspace.document?.name || "N/A";
  }

  async function onStylesheetChange() {
    stylesheetName.textContent = workspace.stylesheet?.name || "N/A";
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
