export class Question {
  /**
   * @type {string}
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

  get id() {
    return this.#id;
  }

  get question() {
    return this.#question;
  }

  get answers() {
    return this.#answers;
  }

  get rightAnswer() {
    return this.#rightAnswer;
  }

  set id(value) {
    this.#id = value;
  }

  set question(value) {
    this.#question = value;
  }

  set answers(value) {
    this.#answers = value;
  }

  set rightAnswer(value) {
    this.#rightAnswer = value;
  }

  /**
   * @returns {boolean}
   */
  valid() {
    return this.question && this.answers && this.rightAnswer;
  }
}
