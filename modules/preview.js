import { workspace } from "../stores/workspace.js";
import { settings } from "../stores/settings.js";
import {
  findFileInDirectory,
  getFileContents,
  resolvePath,
} from "../utilities/file-system.js";
import { workspaceDatabase } from "../databases/workspace.js";

export default ({ preview }) => {
  workspaceDatabase.getItem("handles", "root").then((root) => {
    workspace.loadWorkspace(root);
  });

  workspace.addEventListener("root", onWorkspaceChange);
  workspace.addEventListener("document", onDocumentChange);
  workspace.addEventListener("stylesheet", onStylesheetChange);
  settings.addEventListener("zoom", onZoomChange);

  async function onWorkspaceChange() {
    preview.hidden = false;
  }

  async function onDocumentChange() {
    const template = document.createElement("template");
    const contents = await getFileContents(workspace.document);
    template.innerHTML = contents;
    await convertAssetUrls(template.content);

    const container = preview.contentDocument.querySelector("#document");
    container.replaceChildren(template.content);
  }

  async function onStylesheetChange() {
    const contents = await getFileContents(workspace.stylesheet);

    const container = preview.contentDocument.querySelector("#stylesheet");
    container.textContent = contents;
  }

  async function onZoomChange() {
    const zoomPercentage = `${settings.zoom * 100}%`;
    preview.style.transform = `scale(${zoomPercentage})`;
  }

  async function convertAssetUrls(element) {
    const assetElements = element.querySelectorAll(`[src]`);
    const basePath = await workspace.getDocumentPath();

    for (const assetElement of assetElements) {
      const src = assetElement.getAttribute("src");
      const path = resolvePath(src, basePath);
      const assetHandle = await findFileInDirectory(path, workspace.root);
      const assetContent = await assetHandle.getFile();
      const assetUrl = URL.createObjectURL(assetContent);
      assetElement.src = assetUrl;
    }
  }
};
