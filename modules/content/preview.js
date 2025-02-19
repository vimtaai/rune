import { workspace as workspaceStore } from "../../stores/workspace.js";
import { settings as settingsStore } from "../../stores/settings.js";
import {
  findFileInDirectory,
  getFileContents,
  resolvePath,
} from "../../utilities/file-system.js";

export default ({ preview }) => {
  workspaceStore.addEventListener("root", async () => {
    preview.hidden = !workspaceStore.root;
  });

  workspaceStore.addEventListener("document", async () => {
    const template = document.createElement("template");
    const contents = await getFileContents(workspaceStore.document);
    template.innerHTML = contents;
    await convertAssetUrls(template.content);

    const container = preview.contentDocument.querySelector("#document");
    container.replaceChildren(template.content);
  });

  workspaceStore.addEventListener("stylesheet", async () => {
    const contents = await getFileContents(workspaceStore.stylesheet);

    const container = preview.contentDocument.querySelector("#stylesheet");
    container.textContent = contents;
  });

  settingsStore.addEventListener("zoom", async () => {
    const zoomPercentage = `${settingsStore.zoom * 100}%`;
    preview.style.transform = `scale(${zoomPercentage})`;
  });
};

async function convertAssetUrls(element) {
  const assetElements = element.querySelectorAll(`[src]`);
  const basePath = await workspaceStore.getDocumentPath();

  for (const assetElement of assetElements) {
    const src = assetElement.getAttribute("src");
    const path = resolvePath(src, basePath);
    const assetHandle = await findFileInDirectory(path, workspaceStore.root);
    const assetContent = await assetHandle.getFile();
    const assetUrl = URL.createObjectURL(assetContent);
    assetElement.src = assetUrl;
  }
}
