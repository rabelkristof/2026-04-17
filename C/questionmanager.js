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
   * @param {number} [id]
   * @returns {Question}
   */
  #createQuestion(question, id) {
    const newQuestion = new Question();
    newQuestion.id = id === undefined ? this.#questionList.length : id;
    newQuestion.question = question.question;
    newQuestion.answer = question.answer === "1";

    return newQuestion;
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType} question
   * @returns {void}
   */
  addElement(question) {
    this.#questionList.push(this.#createQuestion(question));
    if (this.#addStatusCallback) this.#addStatusCallback("Sikeres hozzáadás");
  }

  /**
   * @param {import("./gomszab").TrueFalseQuestionType[]} questions
   * @returns {void}
   */
  addElementList(questions) {
    this.#questionList = [];
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].question === undefined ||
        questions[i].answer === undefined
      ) {
        if (this.#importResultCallback)
          this.#importResultCallback(
            `Sikertelen importálás a(z) ${i + 1}. sorban`,
          );

        return;
      } else {
        this.#questionList.push(this.#createQuestion(questions[i]));
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
      .map((q) => `${q.question};${q.answer}`)
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

  /**
   * @param {number} id
   * @returns {import("./gomszab").TrueFalseQuestionType}
   */
  getQuestionTypeById(id) {
    const question = this.#questionList[id];

    return {
      question: question.question,
      answer: question.answer ? "1" : "0",
    };
  }

  /**
   * @param {number} id
   * @param {import("./gomszab").TrueFalseQuestionType} question
   * @returns {void}
   */
  updateElement(id, question) {
    const newQuestion = this.#createQuestion(question, id);

    this.#questionList[id] = newQuestion;
    if (this.#addStatusCallback) this.#addStatusCallback("Sikeres szerkesztés");
  }
}
