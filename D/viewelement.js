import { createDiv, hide, show } from "./gomszab.js";

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
    this.#div = createDiv({ id });
  }

  /**
   * @param {HTMLElement} parent
   * @returns {void}
   */
  appendTo(parent) {
    parent.appendChild(this.#div);
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  navigate(id) {
    if (this.#id === id) {
      show(this.#div);
      if (this.#activateCallback) this.#activateCallback();
    } else {
      hide(this.#div);
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
   * @param {ActivateCallback} value
   */
  set activateCallback(value) {
    this.#activateCallback = value;
  }
}
