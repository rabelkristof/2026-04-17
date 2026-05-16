import { createButton, createDiv } from "./gomszab.js";
import { QuizManager } from "./quizmanager.js";
import { ViewElement } from "./viewelement.js";

export class QuizView extends ViewElement {
  /**
   * @type {QuizManager}
   */
  #manager;

  /**
   * @param {string} id
   * @param {QuizManager} manager
   */
  constructor(id, manager) {
    super(id);
    this.div.id = "quiz";

    this.#manager = manager;

    this.#manager.nextQuestionCallback = (question) => {
      this.div.innerHTML = "";
      this.div.appendChild(this.#createQuestionDiv(question));
    };

    this.#manager.finishResultCallback = (result) => {
      this.div.innerHTML = "";

      const resultDiv = createDiv({ parent: this.div, classList: ["result"] });
      resultDiv.innerText = `Elért eredmény: ${result}`;

      const restartButton = createButton({
        parent: this.div,
        classList: ["play"],
        label: "Újra",
      });
      restartButton.addEventListener("click", () => {
        this.#manager.startQuiz();
      });
    };

    const startButton = createButton({
      parent: this.div,
      classList: ["play"],
      label: "Start",
    });
    startButton.addEventListener("click", () => {
      this.#manager.startQuiz();
    });
  }

  /**
   * @param {import("./quizmanager.js").QuestionViewType} question
   * @returns {HTMLDivElement}
   */
  #createQuestionDiv(question) {
    const questionDiv = createDiv({ classList: ["question"] });
    questionDiv.innerText = question.question;

    const answerDiv = createDiv({
      parent: questionDiv,
      classList: ["answers"],
    });
    for (const answer of question.answers) {
      const answerButton = createButton({ parent: answerDiv });
      answerButton.innerText = answer;
      answerButton.addEventListener("click", () => {
        this.#manager.nextQuestion(answer);
      });
    }

    return questionDiv;
  }
}
