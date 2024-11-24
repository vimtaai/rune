import { workspace } from "../stores/workspace.js";
import { settings } from "../stores/settings.js";
import {
  findFileInDirectory,
  getFileContents,
  resolvePath,
} from "../utilities/file-system.js";

export default ({ preview }) => {
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

    const documentElement = preview.shadowRoot.querySelector("#document");
    documentElement.replaceChildren(template.content);
  }

  async function onStylesheetChange() {
    const contents = await getFileContents(workspace.stylesheet);
    const stylesheetElement = preview.shadowRoot.querySelector("#stylesheet");
    stylesheetElement.textContent = contents;
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
