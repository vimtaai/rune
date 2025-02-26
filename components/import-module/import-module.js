import { ImportBase } from "../import-base.js";

export class ImportModule extends ImportBase {
  #refs = {};

  async onLoad(template) {
    const refElements = Array.from(template.querySelectorAll("[data-ref]"));
    const refEntries = refElements.map((ref) => [this.#getRefName(ref), ref]);
    this.#refs = Object.fromEntries(refEntries);
  }

  async onConnected() {
    const modulePath = this.template.replace(/\.html$/, ".js");
    const moduleUrl = document.baseURI + modulePath;
    const module = await import(moduleUrl);
    const init = module.default || (() => {});

    await init(this.#refs);
  }

  #getRefName(ref) {
    const refAttribute = ref.dataset.ref;
    return refAttribute.replaceAll(/-\w/g, (match) => match[1].toUpperCase());
  }
}

customElements.define("import-module", ImportModule);
