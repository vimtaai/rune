import { workspace as workspaceStore } from "/stores/workspace.js";

export default ({ stylesheetButton, stylesheetName }) => {
  workspaceStore.addEventListener("root", async () => {
    stylesheetButton.disabled = !workspaceStore.root;
  });

  workspaceStore.addEventListener("stylesheet", () => {
    stylesheetName.textContent = workspaceStore.stylesheet?.name || "N/A";
  });

  stylesheetButton.addEventListener("click", () => {
    workspaceStore.pickStylesheet();
  });
};
