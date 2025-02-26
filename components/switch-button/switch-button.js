import { ComponentBase } from "../component-base.js";

export class SwitchButton extends ComponentBase {
  onConnected() {
    this.role = "switch";
    this.ariaChecked = false;

    this.addEventListener("click", () => {
      const isChecked = this.ariaChecked === "true";
      this.setAttribute("aria-checked", !isChecked);
    });
  }

  get checked() {
    return this.ariaChecked === "true";
  }
}

customElements.define("switch-button", SwitchButton);
