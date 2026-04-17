import { Question } from "./question.js";

/**
 * @callback RenderCallback
 * @param {Question[]} list
 * @returns {void}
 */

/**
 * @typedef {{question: string, answer1: string, answer2: string, answer3: string, answer4: string, rightAnswer: string}} QuestionType
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
   * @param {QuestionType[]} questions
   */
  constructor(questions = undefined) {
    this.#questionList = [];
    if (questions) {
      for (const question of questions) {
        this.#questionList.push(this.#createQuestion(question));
      }
    }
  }

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
   * @param {QuestionType} question
   * @returns {Question}
   */
  #createQuestion(question) {
    const questionClass = new Question();
    questionClass.id = this.#questionList.length + 1;
    questionClass.question = question.question;
    questionClass.answers = [
      question.answer1,
      question.answer2,
      question.answer3,
      question.answer4,
    ];
    questionClass.rightAnswer = question.rightAnswer;

    return questionClass;
  }
}
