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
    const questionClass = new Question();
    questionClass.id = this.#questionList.length;
    questionClass.question = question.question;
    questionClass.answer =
      question.answer === "1" ? true : question.answer === "0" ? false : null;

    return questionClass;
  }

  /**
   * @param {AddStatusCallback} value
   */
  set addStatusCallback(value) {
    this.#addStatusCallback = value;
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType} question
   * @returns {void}
   */
  addElement(question) {
    const newQuestion = this.#createQuestion(question);
    if (newQuestion.answer !== null) {
      this.#questionList.push(newQuestion);
      if (this.#addStatusCallback) this.#addStatusCallback("Sikeres hozzáadás");
    } else {
      if (this.#addStatusCallback)
        this.#addStatusCallback(
          "Sikertelen hozzáadás (csak 0 és 1 érték adható meg)",
        );
    }
  }

  /**
   * @param {ImportResultCallback} value
   */
  set importResultCallback(value) {
    this.#importResultCallback = value;
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType[]} questions
   * @returns {void}
   */
  addElementList(questions) {
    this.#questionList = [];
    for (let i = 0; i < questions.length; i++) {
      const question = this.#createQuestion(questions[i]);

      if (!question.question || question.answer === null) {
        if (this.#importResultCallback)
          this.#importResultCallback(
            `Sikertelen importálás a(z) ${i + 1}. sorban`,
          );
        return;
      } else {
        this.#questionList.push(question);
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
      .map((q) => `${q.question};${q.answer ? "1" : "0"}`)
      .join("\n");
  }
}
