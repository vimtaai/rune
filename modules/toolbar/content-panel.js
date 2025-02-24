import { settings } from "../../stores/settings.js";
import { workspace } from "../../stores/workspace.js";

export default ({ textEditButton }) => {
  workspace.addEventListener("root", () => {
    textEditButton.disabled = workspace.isOpen;
  });

  settings.addEventListener("isContentEditable", () => {
    textEditButton.checked = settings.isContentEditable;
  });

  textEditButton.addEventListener("click", () => {
    settings.isContentEditable = !settings.isContentEditable;
  });
};
