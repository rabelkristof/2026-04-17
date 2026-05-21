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
    this.#manager = manager;

    this.#manager.nextQuestionCallback = (question) => {
      this.div.innerHTML = "";

      const questionDiv = createDiv({
        parent: this.div,
        classList: ["question"],
      });
      questionDiv.innerText = question.question;

      const answersDiv = createDiv({
        parent: questionDiv,
        classList: ["answers"],
      });

      for (const answer of question.answers) {
        const button = createButton({ parent: answersDiv, label: answer });
        button.addEventListener("click", () => {
          this.#manager.nextQuestion(answer);
        });
      }
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
}
