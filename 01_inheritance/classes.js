import { createElement } from "../functions.js";

class ParentViewElementClass {
  /**
   * @type {string}
   */
  #id;

  /**
   * @type {HTMLDivElement}
   */
  #div;

  /**
   *
   * @param {string} id
   */
  constructor(id) {
    this.#id = id;
    this.#div = document.createElement("div");
    this.#div.id = id;
    this.#div.classList.add("card");
  }

  /**
   * @returns {HTMLDivElement}
   */
  get div() {
    return this.#div;
  }

  /**
   * @param {HTMLElement} parent
   */
  appendTo(parent) {
    if (this.#div) parent.appendChild(this.#div);
  }
}

class ClassA extends ParentViewElementClass {
  constructor(id) {
    super(id);
    const idP = createElement("span", this.div);
    idP.innerText = id;
    idP.classList.add("head");
    createElement("br", this.div);
    const nameP = createElement("span", this.div);
    nameP.innerText = "childA";
  }
}

class ClassB extends ParentViewElementClass {
  constructor(id) {
    super(id);
    const idP = createElement("span", this.div);
    idP.innerText = id;
    idP.classList.add("head");
    createElement("br", this.div);
    const nameP = createElement("span", this.div);
    nameP.innerText = "childB";
  }
}

export { ClassA, ClassB };
