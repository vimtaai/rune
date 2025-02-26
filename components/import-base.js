export class ImportBase extends HTMLElement {
  async connectedCallback() {
    const response = await fetch(this.template);
    const content = await response.text();
    const template = document.createElement("template");

    template.setHTMLUnsafe(content);
    await this.onLoad(template.content);

    this.loadTemplate(template.content);
    await this.onConnected();
  }

  get template() {
    return this.getAttribute("src");
  }

  loadTemplate(template) {
    this.replaceWith(template);
  }

  async onLoad() {}
  async onConnected() {}
}
