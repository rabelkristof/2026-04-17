/**
 * @callback ActivateCallback
 * @returns {void}
 */

import { createDiv } from "./gomszab.js";

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
   * @returns {void}
   */
  navigate() {
    if (this.#activateCallback) this.#activateCallback();
  }

  /**
   * @returns {string}
   */
  get id() {
    return this.#id;
  }

  /**
   * @returns {HTMLElement}
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
