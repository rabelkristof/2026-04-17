import { Question } from "./question.js";
import { QuestionManager } from "./questionmanager.js";

/**
 * @typedef {{question: string}} QuestionViewType
 */

/**
 * @callback NextQuestionCallback
 * @param {QuestionViewType} question
 * @returns {void}
 */

/**
 * @callback FinishResultCallback
 * @param {string} result
 * @returns {void}
 */

export class QuizManager {
  /**
   * @type {number}
   */
  #currentQuestionNumber;

  /**
   * @type {Question[]}
   */
  #questions;

  /**
   * @type {string[]}
   */
  #questionAnswers;

  /**
   * @type {NextQuestionCallback}
   */
  #nextQuestionCallback;

  /**
   * @type {FinishResultCallback}
   */
  #finishResultCallback;

  /**
   * @type {QuestionManager}
   */
  #manager;

  /**
   * @param {QuestionManager} manager
   */
  constructor(manager) {
    this.#manager = manager;
  }

  /**
   * @returns {void}
   */
  startQuiz() {
    this.#questions = this.#manager.getQuestionTypeList().map((q) => {
      const question = new Question();
      question.question = q.question;
      question.answer = q.answer === "1";

      return question;
    });
    this.#questionAnswers = [];
    this.#currentQuestionNumber = 0;

    if (this.#questions.length > 0 && this.#nextQuestionCallback) {
      this.#nextQuestionCallback({ question: this.#questions[0].question });
      this.#currentQuestionNumber++;
    }
  }

  /**
   * @param {string} answer
   * @returns {void}
   */
  nextQuestion(answer) {
    this.#questionAnswers.push(answer);

    if (this.#currentQuestionNumber >= this.#questions.length) {
      const all = this.#questions.length;
      let correct = 0;
      for (let i = 0; i < this.#questions.length; i++) {
        if (
          (this.#questions[i].answer ? "1" : "0") == this.#questionAnswers[i]
        ) {
          correct++;
        }
      }

      if (this.#finishResultCallback) {
        this.#finishResultCallback(`${correct}/${all}`);
      }
    } else {
      this.#nextQuestionCallback({
        question: this.#questions[this.#currentQuestionNumber].question,
      });
      this.#currentQuestionNumber++;
    }
  }

  /**
   * @param {NextQuestionCallback} value
   */
  set nextQuestionCallback(value) {
    this.#nextQuestionCallback = value;
  }

  /**
   * @param {FinishResultCallback} value
   */
  set finishResultCallback(value) {
    this.#finishResultCallback = value;
  }
}
