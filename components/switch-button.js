export class SwitchButton extends HTMLElement {
  static observedAttributes = ["checked"];

  #defaultSlot = null;
  #checkedSlot = null;
  #uncheckedSlot = null;

  constructor() {
    super();
    this.attachInternals();
    this.attachShadow({ mode: "open" });
    this.setAttribute("role", "switch");

    this.#defaultSlot = document.createElement("slot");
    this.#checkedSlot = document.createElement("slot");
    this.#checkedSlot.name = "checked";
    this.#uncheckedSlot = document.createElement("slot");
    this.#uncheckedSlot.name = "unchecked";
    this.#update();

    this.shadowRoot.append(this.#defaultSlot);
    this.shadowRoot.append(this.#checkedSlot);
    this.shadowRoot.append(this.#uncheckedSlot);
    this.addEventListener("click", () => this.#update());
  }

  attributeChangedCallback() {
    this.#update();
  }

  set checked(value) {
    this.toggleAttribute("checked", value);
  }

  #update() {
    const isChecked = this.hasAttribute("checked");
    this.ariaChecked = isChecked;
    this.#checkedSlot.hidden = isChecked;
    this.#uncheckedSlot.hidden = !isChecked;
  }
}

customElements.define("switch-button", SwitchButton);
