import { show, hide } from "./gomszab.js";

/**
 * @callback ActivateCallback
 * @param {number} [questionId]
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
   * @param {string} id
   * @param {number} [questionId]
   * @returns {void}
   */
  navigate(id, questionId) {
    if (id != this.#id) {
      hide(this.#div);
    } else {
      show(this.#div);
      if (this.#activateCallback) this.#activateCallback(questionId);
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
