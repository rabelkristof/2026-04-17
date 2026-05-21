export class Question {
  /**
   * @type {number}
   */
  #id;

  /**
   * @type {string}
   */
  #question;

  /**
   * @type {boolean}
   */
  #answer;

  /**
   * @returns {number}
   */
  get id() {
    return this.#id;
  }

  /**
   * @param {number} value
   */
  set id(value) {
    this.#id = value;
  }

  /**
   * @returns {string}
   */
  get question() {
    return this.#question;
  }

  /**
   * @param {string} value
   */
  set question(value) {
    this.#question = value;
  }

  /**
   * @returns {boolean}
   */
  get answer() {
    return this.#answer;
  }

  /**
   * @param {boolean} value
   */
  set answer(value) {
    this.#answer = value;
  }
}
