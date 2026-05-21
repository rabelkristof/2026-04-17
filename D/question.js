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
   * @type {string[]}
   */
  #answers;

  /**
   * @type {string}
   */
  #rightAnswer;

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
   * @returns {string[]}
   */
  get answers() {
    return this.#answers;
  }

  /**
   * @param {string[]} value
   */
  set answers(value) {
    this.#answers = value;
  }

  /**
   * @returns {string}
   */
  get rightAnswer() {
    return this.#rightAnswer;
  }

  /**
   * @param {string} value
   */
  set rightAnswer(value) {
    this.#rightAnswer = value;
  }
}
