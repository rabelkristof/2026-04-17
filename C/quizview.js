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

      const trueButton = createButton({
        parent: this.div,
        classList: ["card-true"],
        label: question.question,
      });
      trueButton.onclick = () => {
        this.#manager.nextQuestion("1");
      };

      const falseButton = createButton({
        parent: this.div,
        classList: ["card-false"],
        label: question.question,
      });
      falseButton.onclick = () => {
        this.#manager.nextQuestion("0");
      };
    };

    this.#manager.finishResultCallback = (result) => {
      this.div.innerHTML = "";

      const resultDiv = createDiv({ parent: this.div, classList: ["result"] });
      resultDiv.innerText = `Ennyit sikerült eltalálni: ${result}`;

      const restartButton = createButton({
        parent: this.div,
        classList: ["play"],
        label: "Újra",
      });
      restartButton.onclick = () => {
        this.#manager.startQuiz();
      };
    };

    const startButton = createButton({
      parent: this.div,
      classList: ["play"],
      label: "Start",
    });
    startButton.onclick = () => {
      this.#manager.startQuiz();
    };
  }
}
