import { show, hide } from "./gomszab.js";

/**
 * @callback ActivateCallback
 * @returns {void}
 */

export class ViewElement {
  /**
   * @type {string}
   */
  #id;

  /**
   * @type {HTMLDivElement}
   */
  #div;

  /**
   * @type {ActivateCallback}
   */
  #activateCallback;

  /**
   * @param {string} id
   */
  constructor(id) {
    this.#id = id;
    this.#div = document.createElement("div");
    this.#div.id = this.#id;
  }

  /**
   *
   * @param {HTMLElement} parent
   */
  appendTo(parent) {
    parent.appendChild(this.#div);
  }

  /**
   * @returns {void}
   */
  navigate(id) {
    if (id != this.#id) {
      hide(this.#div);
    } else {
      show(this.#div);
      if (this.#activateCallback) this.#activateCallback();
    }
  }

  /**
   * @returns {string}
   */
  get id() {
    return this.#id;
  }

  /**
   * @returns {HTMLDivElement}
   */
  get div() {
    return this.#div;
  }

  /**
   * @type {ActivateCallback}
   */
  set activateCallback(value) {
    this.#activateCallback = value;
  }
}
