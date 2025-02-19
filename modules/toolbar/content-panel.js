import { settings } from "../../stores/settings.js";
import { workspace } from "../../stores/workspace.js";

export default ({ textEditOnButton, textEditOffButton }) => {
  workspace.addEventListener("root", () => {
    textEditOnButton.disabled = workspace.isOpen;
    textEditOffButton.disabled = workspace.isOpen;
  });

  settings.addEventListener("isContentEditable", () => {
    textEditOnButton.hidden = settings.isContentEditable;
    textEditOffButton.hidden = !settings.isContentEditable;
  });

  textEditOnButton.addEventListener("click", () => {
    settings.isContentEditable = true;
  });

  textEditOffButton.addEventListener("click", () => {
    settings.isContentEditable = false;
  });
};
