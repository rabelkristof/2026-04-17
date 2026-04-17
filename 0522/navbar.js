import { createButton, createDiv } from "./gomszab.js";
import { ViewElement } from "./viewelement.js";

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
    const button = createButton({ label });
    button.addEventListener("click", () => {
      this.navigate(view.id);
      button.classList.add("active");
    });

    this.#buttonBar.appendChild(button);
    this.#viewElementList.push(view);
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  navigate(id) {
    for (const button of this.#buttonBar.querySelectorAll("button")) {
      button.classList.remove("active");
    }

    this.#viewContainer.innerHTML = "";
    for (const viewElement of this.#viewElementList) {
      if (viewElement.id == id) {
        this.#viewContainer.appendChild(viewElement.div);
      }
    }
  }
}
