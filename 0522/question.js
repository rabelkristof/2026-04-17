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
  #rightanswer;

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get question() {
    return this.#question;
  }

  set question(value) {
    this.#question = value;
  }

  get answers() {
    return this.#answers;
  }

  set answers(value) {
    this.#answers = value;
  }

  get rightAnswer() {
    return this.#rightanswer;
  }

  set rightAnswer(value) {
    this.#rightanswer = value;
  }
}
