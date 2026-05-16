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
   * @param {import("./gomszab.js").QuestionType[]} questions
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
   * @param {import("./gomszab.js").QuestionType} question
   * @param {number} [id]
   * @returns {Question}
   */
  #createQuestion(question, id) {
    const questionClass = new Question();
    questionClass.id = id != undefined ? id : this.#questionList.length;
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

  /**
   * @param {import("./gomszab.js").QuestionType} question
   * @returns {void}
   */
  addElement(question) {
    const newQuestion = this.#createQuestion(question);
    if (
      newQuestion.question &&
      newQuestion.rightAnswer &&
      newQuestion.answers.length == 4
    ) {
      if (this.#addStatusCallback) this.#addStatusCallback("Sikeres hozzáadás");
      this.#questionList.push(newQuestion);
    } else {
      if (this.#addStatusCallback)
        this.#addStatusCallback("Sikertelen hozzáadás");
    }
  }

  /**
   * @param {import("./gomszab.js").QuestionType[]} questions
   * @returns {void}
   */
  addElementList(questions) {
    this.#questionList = [];

    for (let i = 0; i < questions.length; i++) {
      const newQuestion = this.#createQuestion(questions[i]);

      if (
        newQuestion.question &&
        newQuestion.rightAnswer &&
        newQuestion.answers.length == 4
      ) {
        this.#questionList.push(newQuestion);
      } else {
        if (this.#importResultCallback) {
          this.#importResultCallback(`Sikertelen hozzáadás a ${i + 1}. sorban`);
        }
        return;
      }
    }

    if (this.#importResultCallback)
      this.#importResultCallback("Sikeres hozzáadás");
  }

  /**
   * @returns {string}
   */
  getExportContent() {
    const result = [];
    for (const question of this.#questionList) {
      result.push(
        `${question.question};${question.answers.join(";")};${question.rightAnswer}`,
      );
    }

    return result.join("\n");
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

  /**
   * @param {number} id
   * @returns {import("./gomszab.js").QuestionType}
   */
  getQuestionTypeById(id) {
    const question = this.#questionList[id];
    return {
      question: question.question,
      answer1: question.answers[0],
      answer2: question.answers[1],
      answer3: question.answers[2],
      answer4: question.answers[3],
      rightAnswer: question.rightAnswer,
    };
  }

  /**
   * @param {number} id
   * @param {import("./gomszab.js").QuestionType} question
   * @returns {void}
   */
  updateElement(id, question) {
    const newQuestion = this.#createQuestion(question, id);
    if (
      newQuestion.question &&
      newQuestion.rightAnswer &&
      newQuestion.answers.length == 4
    ) {
      if (this.#addStatusCallback)
        this.#addStatusCallback("Sikeres szerkesztés");
      this.#questionList[id] = newQuestion;
    } else {
      if (this.#addStatusCallback)
        this.#addStatusCallback("Sikertelen szerkesztés");
    }
  }

  /**
   * @returns {import("./gomszab.js").QuestionType[]}
   */
  getQuestionTypeList() {
    return this.#questionList.map((_, i) => this.getQuestionTypeById(i));
  }
}
