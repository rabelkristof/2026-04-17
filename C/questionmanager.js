import { Question } from "./question.js";

/**
 * @callback RenderCallback
 * @param {Question[]} list
 * @returns {void}
 */

/**
 * @callback AddStatusCallback
 * @param {string} message
 * @returns {void}
 */

/**
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 */

export class QuestionManager {
  /**
   * @type {Question[]}
   */
  #questionList;

  /**
   * @type {RenderCallback}
   */
  #renderCallback;

  /**
   * @type {AddStatusCallback}
   */
  #addStatusCallback;

  /**
   * @type {ImportResultCallback}
   */
  #importResultCallback;

  /**
   * @param {import("./gomszab").TrueFalseQuestionType[]} [questions]
   */
  constructor(questions) {
    this.#questionList = [];

    for (const question of questions) {
      this.#questionList.push(this.#createQuestion(question));
    }
  }

  /**
   * @returns {void}
   */
  getAllElement() {
    if (this.#renderCallback) this.#renderCallback(this.#questionList);
  }

  /**
   * @param {RenderCallback} value
   */
  set renderCallback(value) {
    this.#renderCallback = value;
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType} question
   * @returns {Question}
   */
  #createQuestion(question) {
    const newQuestion = new Question();
    newQuestion.id = this.#questionList.length;
    newQuestion.question = question.question;
    newQuestion.answer = question.answer === "1";

    return newQuestion;
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType} question
   * @returns {void}
   */
  addElement(question) {
    this.#questionList.push(this.#createQuestion(question));
    if (this.#addStatusCallback) this.#addStatusCallback("Sikeres hozzáadás");
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType[]} questions
   * @returns {void}
   */
  addElementList(questions) {
    this.#questionList = [];
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].question === undefined ||
        questions[i].answer === undefined
      ) {
        if (this.#importResultCallback)
          this.#importResultCallback(
            `Sikertelen importálás a(z) ${i + 1}. sorban`,
          );

        return;
      } else {
        this.#questionList.push(this.#createQuestion(questions[i]));
      }
    }

    if (this.#importResultCallback)
      this.#importResultCallback("Sikeres importálás");
  }

  /**
   * @returns {string}
   */
  getExportContent() {
    return this.#questionList
      .map((q) => `${q.question};${q.answer}`)
      .join("\n");
  }

  /**
   * @param {AddStatusCallback} value
   */
  set addStatusCallback(value) {
    this.#addStatusCallback = value;
  }

  /**
   * @param {ImportResultCallback} value
   */
  set importResultCallback(value) {
    this.#importResultCallback = value;
  }
}
