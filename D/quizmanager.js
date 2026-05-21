/**
 * @typedef {{question: string, answers: string[]}} QuestionViewType
 */

import { Question } from "./question.js";
import { QuestionManager } from "./questionmanager.js";

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
    this.#currentQuestionNumber = 0;
    this.#questions = this.#manager.getQuestionTypeList().map((q) => {
      const question = new Question();
      question.question = q.question;
      question.answers = [q.answer1, q.answer2, q.answer3, q.answer4];
      question.rightAnswer = q.rightAnswer;

      return question;
    });
    this.#questionAnswers = [];

    if (this.#questions.length > 0 && this.#nextQuestionCallback) {
      this.#nextQuestionCallback({
        question: this.#questions[0].question,
        answers: this.#questions[0].answers,
      });
    }
  }

  /**
   * @param {string} answer
   * @returns {void}
   */
  nextQuestion(answer) {
    this.#currentQuestionNumber++;
    this.#questionAnswers.push(answer);

    if (this.#currentQuestionNumber < this.#questions.length) {
      if (this.#nextQuestionCallback)
        this.#nextQuestionCallback({
          question: this.#questions[this.#currentQuestionNumber].question,
          answers: this.#questions[this.#currentQuestionNumber].answers,
        });
    } else {
      const all = this.#questions.length;
      let correct = 0;
      for (let i = 0; i < this.#questions.length; i++) {
        if (this.#questions[i].rightAnswer == this.#questionAnswers[i]) {
          correct++;
        }
      }

      if (this.#finishResultCallback)
        this.#finishResultCallback(`${correct}/${all}`);
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
