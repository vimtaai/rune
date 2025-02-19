import { settings } from "../../stores/settings.js";
import { workspace } from "../../stores/workspace.js";

export default ({ zoomInButton, zoomOutButton, zoomResetButton }) => {
  workspace.addEventListener("root", onWorkspaceChange);

  zoomInButton.addEventListener("click", onZoomInClick);
  zoomOutButton.addEventListener("click", onZoomOutClick);
  zoomResetButton.addEventListener("click", onZoomResetClick);

  async function onWorkspaceChange() {
    zoomInButton.disabled = workspace.isOpen;
    zoomOutButton.disabled = workspace.isOpen;
    zoomResetButton.disabled = workspace.isOpen;
  }

  function onZoomInClick() {
    settings.zoomIn();
  }

  function onZoomOutClick() {
    settings.zoomOut();
  }

  function onZoomResetClick() {
    settings.zoomReset();
  }
};
