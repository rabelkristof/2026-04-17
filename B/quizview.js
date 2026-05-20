import { createButton, createDiv } from "./gomszab.js";
import { QuizManager } from "./quizmanager.js";
import { ViewElement } from "./viewelement.js";

/**
 * @typedef {{question: string}} QuestionViewType
 */

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

    const start = createButton({
      parent: this.div,
      classList: ["play"],
      label: "Start",
    });
    this.div.appendChild(start);

    start.onclick = () => {
      this.#manager.startQuiz();
    };

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
      resultDiv.innerText = result;

      const restartButton = createButton({
        parent: this.div,
        classList: ["play"],
        label: "Újra",
      });
      restartButton.onclick = () => {
        this.#manager.startQuiz();
      };
    };
  }
}
