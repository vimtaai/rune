import { workspace } from "../../stores/workspace.js";

export default ({ printButton }) => {
  workspace.addEventListener("root", onWorkspaceChange);
  printButton.addEventListener("click", onPrintButtonClick);

  async function onWorkspaceChange() {
    printButton.disabled = workspace.isOpen;
  }

  function onPrintButtonClick() {
    window.print();
  }
};
