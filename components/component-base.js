import { ImportBase } from "./import-base.js";

export class ComponentBase extends ImportBase {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.attachInternals();
  }

  get template() {
    const className = this.constructor.name;
    const fileName = this.#convertToKebabCase(className);
    return `components/${fileName}/${fileName}.html`;
  }

  loadTemplate(template) {
    this.shadowRoot.replaceChildren(template);
  }

  #convertToKebabCase(string) {
    return string
      .replaceAll(/([A-Z])/g, "-$1")
      .toLowerCase()
      .substring(1);
  }
}
