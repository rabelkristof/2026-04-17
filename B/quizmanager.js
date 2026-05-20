import { Question } from "./question.js";
import { QuestionManager } from "./questionmanager.js";

/**
 * @callback NextQuestionCallback
 * @param {import("./quizview.js").QuestionViewType} question
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
    this.#questions = [];
    this.#currentQuestionNumber = 0;
    this.#questionAnswers = [];
  }

  /**
   * @returns {void}
   */
  startQuiz() {
    this.#currentQuestionNumber = 0;
    this.#questionAnswers = [];
    this.#getQuestions();
    if (this.#questions.length > 0 && this.#nextQuestionCallback) {
      this.#nextQuestionCallback({
        question: this.#questions[this.#currentQuestionNumber].question,
      });
      this.#currentQuestionNumber++;
    }
  }

  /**
   * @param {string} answer
   * @returns {void}
   */
  nextQuestion(answer) {
    this.#questionAnswers.push(answer);

    if (this.#questions.length > this.#currentQuestionNumber) {
      if (this.#nextQuestionCallback) {
        this.#nextQuestionCallback({
          question: this.#questions[this.#currentQuestionNumber].question,
        });
      }
      this.#currentQuestionNumber++;
    } else {
      const all = this.#questions.length;
      let correct = 0;
      for (let i = 0; i < this.#questions.length; i++) {
        if (
          (this.#questions[i].answer ? "1" : "0") === this.#questionAnswers[i]
        ) {
          correct++;
        }
      }

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

  /**
   * @returns {void}
   */
  #getQuestions() {
    this.#questions = [];
    const questions = this.#manager.getQuestionTypeList();
    for (const question of questions) {
      const questionClass = new Question();
      questionClass.question = question.question;
      questionClass.answer = question.answer;

      this.#questions.push(questionClass);
    }
  }
}
