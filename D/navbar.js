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
    this.#viewElementList.push(view);

    const button = createRadioButton({
      id: `${view.id}button`,
      label,
      name: "tab",
    });
    this.div.appendChild(button);

    button.onclick = () => {
      this.navigate(view.id);
    };
  }

  /**
   * @param {string} id
   * @param {number} [questionId]
   * @returns {void}
   */
  navigate(id, questionId) {
    for (const viewElement of this.#viewElementList) {
      viewElement.navigate(id, questionId);
    }

    for (const radioButton of this.div.querySelectorAll(
      "input[type='radio']",
    )) {
      if (radioButton.id === `${id}button`) {
        radioButton.checked = true;
      }
    }
  }
}
