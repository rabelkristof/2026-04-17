import { ViewElement } from "./viewelement.js";
import { createButton, createDiv } from "./gomszab.js";

export class NavigationBar extends ViewElement {
  /**
   * @type {ViewElement[]}
   */
  #viewElementList;

  /**
   * @type {HTMLDivElement}
   */
  #buttonBar;

  /**
   * @type {HTMLDivElement}
   */
  #viewContainer;

  /**
   * @param {string} id
   */
  constructor(id) {
    super(id);
    this.#viewElementList = [];
    this.#buttonBar = createDiv({ parent: this.div, classList: ["buttonbar"] });
    this.#viewContainer = createDiv({ parent: this.div });
  }

  /**
   * @param {string} label
   * @param {ViewElement} view
   * @returns {void}
   */
  addViewElement(label, view) {
    this.#viewElementList.push(view);

    const button = createButton({
      id: `${view.id}button`,
      parent: this.#buttonBar,
      label,
    });
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
    this.#viewContainer.innerHTML = "";
    for (const viewelement of this.#viewElementList) {
      if (viewelement.id == id) {
        viewelement.navigate(questionId);
        viewelement.appendTo(this.#viewContainer);
      }
    }

    for (const button of this.#buttonBar.getElementsByTagName("button")) {
      if (button.id === `${id}button`) button.classList.add("active");
      else button.classList.remove("active");
    }
  }
}
