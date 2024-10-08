export class ImportBase extends HTMLElement {
  async connectedCallback() {
    const url = this.getAttribute("src");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not import file "${url}".`);
    }

    const content = await response.text();
    const template = document.createElement("template");

    template.setHTMLUnsafe(content);
    await this.onLoad(template.content);

    this.replaceWith(template.content);
    await this.onReplace(template.content);
  }

  async onLoad() {}
  async onReplace() {}
}
