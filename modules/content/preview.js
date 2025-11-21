import { workspace as workspaceStore } from "../../stores/workspace.js";
import { settings as settingsStore } from "../../stores/settings.js";
import {
  findFileInDirectory,
  getFileContents,
  resolvePath,
} from "../../utilities/file-system.js";

export default ({ preview }) => {
  const previewDocument = preview.contentDocument;
  const documentElement = previewDocument.querySelector("#document");
  const stylesheetElement = previewDocument.querySelector("#stylesheet");
  const placeholderContent = documentElement.innerHTML;

  workspaceStore.addEventListener("root", () => {
    preview.hidden = !workspaceStore.root;
  });

  workspaceStore.addEventListener("document", async () => {
    const contents = await getFileContents(workspaceStore.document);
    documentElement.innerHTML = contents || placeholderContent;
    await convertAssetUrls(documentElement);
  });

  workspaceStore.addEventListener("stylesheet", async () => {
    const contents = await getFileContents(workspaceStore.stylesheet);
    stylesheetElement.textContent = contents;
  });

  settingsStore.addEventListener("zoom", () => {
    const zoomPercentage = `${settingsStore.zoom * 100}%`;
    preview.style.transform = `scale(${zoomPercentage})`;
  });

  settingsStore.addEventListener("isContentEditable", () => {
    documentElement.contentEditable = settingsStore.isContentEditable;
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
