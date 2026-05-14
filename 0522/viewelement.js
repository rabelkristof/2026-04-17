import { createDiv } from "./gomszab.js";

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
   * @type {HTMLElement}
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
    this.#div = createDiv({ id });
    this.#id = id;
  }

  /**
   * @param {HTMLElement} parent
   * @returns {void}
   */
  appendTo(parent) {
    parent.appendChild(this.#div);
  }

  /**
   * @param {number} [questionId]
   * @returns {void}
   */
  navigate(questionId) {
    if (this.#activateCallback) this.#activateCallback(questionId);
  }

  get id() {
    return this.#id;
  }

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
