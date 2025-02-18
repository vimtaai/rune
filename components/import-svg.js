import { ImportBase } from "./import-base.js";

export class ImportSvg extends ImportBase {
  async onLoad(template) {
    const svgElement = template.querySelector("svg");
    const attributes = this.attributes;
    attributes.removeNamedItem("src");

    for (const { name, value } of this.attributes) {
      svgElement.setAttribute(name, value);
    }
  }
}

customElements.define("import-svg", ImportSvg);
