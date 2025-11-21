export async function pickDirectory() {
  const direcrtoryHandle = await window.showDirectoryPicker();
  return direcrtoryHandle;
}

export async function pickFileFromDirectory({ directory, description, types }) {
  if (!directory) {
    return;
  }

  const allowedType = {
    description,
    accept: { "*/*": types },
    excludeAcceptAllOption: true,
  };

  const filePickerOptions = { types: [allowedType], startIn: directory };
  const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
  const isFileInDirectory = Boolean(await directory.resolve(fileHandle));

  if (!isFileInDirectory) {
    throw new Error("File must be in specified directory");
  }

  return fileHandle;
}

export async function findFileInDirectory(path, directory) {
  const [entryPath, ...remainingPath] = path.split("/");

  if (remainingPath.length === 0) {
    return directory.getFileHandle(entryPath);
  }

  const nextDirectory = await directory.getDirectoryHandle(entryPath);

  return findFileInDirectory(remainingPath.join("/"), nextDirectory);
}

export async function getFilePath(file, directory) {
  return directory.resolve(file);
}

export async function getFileContents(file) {
  return new Promise(async (resolve) => {
    if (file === null) {
      resolve(null);
    }

    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      resolve(fileReader.result);
    });

    try {
      const fileObject = await file.getFile();
      fileReader.readAsText(fileObject);
    } catch {}
  });
}

export function resolvePath(path, basePath = []) {
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
