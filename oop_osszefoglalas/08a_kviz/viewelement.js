/**
 * @callback ActivateCallback
 * @returns {void}
 */

export class ViewElement {
  /**
   * @type {HTMLDivElement}
   */
  #div;

  /**
   * @type {string}
   */
  #id;

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
    this.#div.id = id;
  }

  /**
   * @param {HTMLElement} value
   * @returns {void}
   */
  appendTo(value) {
    value.appendChild(this.#div);
  }

  /**
   * @param {ActivateCallback} value
   */
  set activateCallback(value) {
    this.#activateCallback = value;
  }

  /**
   * @returns {HTMLDivElement}
   */
  get div() {
    return this.#div;
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  activate(id) {
    if (this.#activateCallback && id == this.#id) this.#activateCallback();
  }
}
