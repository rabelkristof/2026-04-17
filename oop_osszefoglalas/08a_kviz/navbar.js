import { ViewElement } from "./viewelement.js";
import { createElement } from "../functions.js";

export class NavigationBar extends ViewElement {
  /**
   * @type {ViewElement[]}
   */
  #viewElementList;

  constructor() {
    super("navbar");
  }

  /**
   * @param {string} value
   */
  activate(value) {
    for (const viewElement of this.#viewElementList) {
      viewElement.activate(value);
    }
  }

  /**
   * @param {string} label
   * @param {ViewElement} viewElement
   */
  addViewElement(label, viewElement) {
    const div = createElement("div", this.div);
    const radio = createElement("input", div);
    radio.type = "radio";
    const labelElem = createElement("label", div);
    labelElem.innerText = label;
    this.#viewElementList.push(viewElement);
  }
}
