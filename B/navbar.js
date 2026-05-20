import { createRadioButton } from "./gomszab.js";
import { ViewElement } from "./viewelement.js";

export class NavigationBar extends ViewElement {
  /**
   * @type {ViewElement[]}
   */
  #viewElementList;

  /**
   * @param {string} id
   */
  constructor(id) {
    super(id);
    this.#viewElementList = [];
  }

  /**
   * @param {string} label
   * @param {ViewElement} view
   * @returns {void}
   */
  addViewElement(label, view) {
    const buttonDiv = createRadioButton({
      id: view.id,
      label,
      name: "tab",
    });

    buttonDiv.addEventListener("click", () => {
      this.navigate(view.id);
    });

    this.div.appendChild(buttonDiv);
    this.#viewElementList.push(view);
  }

  /**
   * @param {string} id
   */
  navigate(id) {
    for (const viewElement of this.#viewElementList) {
      viewElement.navigate(id);
    }
    this.div.querySelector(`#${id}`).checked = true;
  }
}
