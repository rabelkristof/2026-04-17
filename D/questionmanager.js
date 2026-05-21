import { Question } from "./question.js";

/**
 * @callback RenderCallback
 * @param {Question[]} list
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
}
