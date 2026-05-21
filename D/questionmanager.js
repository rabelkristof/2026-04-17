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
   * @param {import("./gomszab").QuestionType[]} [questions]
   */
  constructor(questions) {
    this.#questionList = [];

    if (questions) {
      for (const question of questions) {
        this.#questionList.push(this.#createQuestion(question));
      }
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
   * @param {import("./gomszab").QuestionType} question
   * @returns {Question}
   */
  #createQuestion(question) {
    const newQuestion = new Question();
    newQuestion.id = this.#questionList.length;
    newQuestion.question = question.question;
    newQuestion.answers = [
      question.answer1,
      question.answer2,
      question.answer3,
      question.answer4,
    ];
    newQuestion.rightAnswer = question.rightAnswer;

    return newQuestion;
  }

  /**
   * @param {import("./gomszab").QuestionType} question
   * @returns {void}
   */
  addElement(question) {
    this.#questionList.push(this.#createQuestion(question));
    if (this.#addStatusCallback) this.#addStatusCallback("Sikeres hozzáadás");
  }

  /**
   * @param {import("./gomszab").QuestionType[]} question
   * @returns {void}
   */
  addElementList(questions) {
    this.#questionList = [];
    for (let i = 0; i < questions.length; i++) {
      const question = this.#createQuestion(questions[i]);
      if (
        question.question &&
        question.answers[0] &&
        question.answers[1] &&
        question.answers[2] &&
        question.answers[3] &&
        question.rightAnswer
      ) {
        this.#questionList.push(question);
      } else {
        if (this.#importResultCallback)
          this.#importResultCallback(
            `Sikertelen importálás a ${i + 1}. sorban`,
          );
        return;
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
      .map((q) => `${q.question};${q.answers.join(";")};${q.rightAnswer}`)
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
