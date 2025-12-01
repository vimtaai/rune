import { workspace } from "../../stores/workspace.js";
import { settings } from "../../stores/settings.js";

export default ({ preview }) => {
  const previewDocument = preview.contentDocument;
  const documentElement = previewDocument.querySelector("#document");
  const stylesheetElement = previewDocument.querySelector("#stylesheet");
  const placeholderContent = documentElement.innerHTML;

  workspace.addEventListener("root", () => {
    preview.hidden = !workspace.root;
  });

  workspace.addEventListener("document", async () => {
    const contents = await workspace.getFileContents(workspace.document);
    documentElement.innerHTML = contents || placeholderContent;

    if (contents) {
      await convertAssetUrls(documentElement);
    }
  });

  workspace.addEventListener("stylesheet", async () => {
    const contents = await workspace.getFileContents(workspace.stylesheet);
    stylesheetElement.textContent = contents;
  });

  settings.addEventListener("zoom", () => {
    const zoomPercentage = `${settings.zoom * 100}%`;
    preview.style.transform = `scale(${zoomPercentage})`;
  });

  settings.addEventListener("isContentEditable", () => {
    documentElement.contentEditable = settings.isContentEditable;
  });
};

async function convertAssetUrls(element) {
  const assetElements = element.querySelectorAll(`[src]`);
  const basePath = await workspace.getDocumentPath();

  for (const assetElement of assetElements) {
    const src = assetElement.getAttribute("src");
    const path = resolvePath(src, basePath);
    const assetHandle = await workspace.findFile(path);
    const assetContent = await assetHandle.getFile();
    const assetUrl = URL.createObjectURL(assetContent);
    assetElement.src = assetUrl;
  }

  function resolvePath(path, basePath = []) {
    if (path.includes("://")) {
      return path;
    }

    const currentPath = [...basePath];
    const remainingPath = path.split("/");

    for (const part of remainingPath) {
      if (part === "..") {
        currentPath.pop();
      } else if (part !== "" && part !== ".") {
        currentPath.push(part);
      }
    }

    return currentPath.join("/");
  }
}
