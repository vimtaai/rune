import { settings } from "../../stores/settings.js";
import { workspace } from "../../stores/workspace.js";

export default ({ textEditButton }) => {
  workspace.addEventListener("root", () => {
    textEditButton.disabled = workspace.isOpen;
  });

  textEditButton.addEventListener("click", () => {
    settings.isContentEditable = textEditButton.checked;
  });
};
