import { QuestionManager } from "./manager.js";
import { Question } from "./question.js";

/**
 * @typedef {{question: string, answers: string[]}} QuestionViewType
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
    this.#questions = [];
    this.#questionAnswers = [];
    this.#currentQuestionNumber = 0;
  }

  /**
   * @returns {void}
   */
  startQuiz() {
    this.#questions = this.#manager
      .getQuestionTypeList()
      .map((questionType) => {
        const question = new Question();
        question.question = questionType.question;
        question.rightAnswer = questionType.rightAnswer;
        question.answers = [
          questionType.answer1,
          questionType.answer2,
          questionType.answer3,
          questionType.answer4,
        ];

        return question;
      });
    this.#currentQuestionNumber = 0;
    this.#questionAnswers = [];
    if (this.#questions.length > 0)
      this.#nextQuestionCallback(this.#questions[0]);
  }

  /**
   * @param {string} answer
   * @returns {void}
   */
  nextQuestion(answer) {
    this.#questionAnswers.push(answer);
    this.#currentQuestionNumber++;

    const nextIdx = this.#currentQuestionNumber;
    if (nextIdx < this.#questions.length) {
      this.#nextQuestionCallback({
        question: this.#questions[nextIdx].question,
        answers: this.#questions[nextIdx].answers,
      });
    } else {
      let correctQuestions = 0;
      for (let i = 0; i < this.#questions.length; i++) {
        if (this.#questions[i].rightAnswer == this.#questionAnswers[i]) {
          correctQuestions++;
        }
      }

      const numQuestions = this.#questions.length;
      this.#finishResultCallback(`${correctQuestions}/${numQuestions}`);
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
