import { Question } from "./question.js";

/**
 * @typedef {{question: string, answers: string[], rightAnswer: string}} QuestionType
 */

export class QuestionManager {
  /**
   * @type {Question[]}
   */
  #questions;

  /**
   * @param {QuestionType} element
   */
  addElement(element) {
    const question = new Question();
    question.id = this.#questions.length + 1;
    question.question = element.question;
    question.answers = element.answers;
    question.rightAnswer = element.rightAnswer;

    this.#questions.push(question);
  }

  /**
   * @returns {Question[]}
   */
  getAllElements() {
    return this.#questions;
  }

  /**
   * @param {QuestionType[]} elementList
   */
  addElementList(elementList) {
    this.#questions = elementList;
  }
}
