import { workspace } from "../stores/workspace.js";

export default ({ toolbar, documentButton, stylesheetButton, printButton }) => {
  workspace.addEventListener("root", onWorkspaceChange);
  printButton.addEventListener("click", onPrintButtonClick);
  documentButton.addEventListener("click", onDocumentButtonClick);
  stylesheetButton.addEventListener("click", onStylesheetButtonClick);

  async function onWorkspaceChange() {
    toolbar.ariaDisabled = workspace.isOpen;
    documentButton.disabled = workspace.isOpen;
    stylesheetButton.disabled = workspace.isOpen;
    printButton.disabled = workspace.isOpen;
  }

  function onPrintButtonClick() {
    window.print();
  }

  function onDocumentButtonClick() {
    workspace.pickDocument();
  }

  function onStylesheetButtonClick() {
    workspace.pickStylesheet();
  }
};
