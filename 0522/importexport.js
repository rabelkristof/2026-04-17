import { createButton, createDiv, createFileInput } from "./gomszab.js";
import { QuestionManager } from "./manager.js";
import { ViewElement } from "./viewelement.js";

export class ImportExport extends ViewElement {
  /**
   * @type {QuestionManager}
   */
  #manager;

  /**
   * @type {HTMLDivElement}
   */
  #resultDiv;

  /**
   * @param {string} id
   * @param {QuestionManager} manager
   */
  constructor(id, manager) {
    super(id);
    this.#manager = manager;
    this.#resultDiv = createDiv({ parent: this.div });
    this.#manager.importResultCallback = (message) => {
      this.#resultDiv.innerText = message;
      setTimeout(() => {
        this.#resultDiv.innerText = "";
      }, 1000);
    };

    this.div.appendChild(this.#createImport());
    this.#createExport();
  }

  /**
   * @returns {void}
   */
  #createExport() {
    const button = createButton({ parent: this.div, label: "Export" });
    button.addEventListener("click", () => {
      const exportString = this.#manager.getExportContent();
      const link = document.createElement("a");
      const file = new Blob([exportString]);
      const url = URL.createObjectURL(file);
      link.href = url;
      link.download = "export.csv";
      link.click();
      URL.revokeObjectURL(url);
    });

    this.div.appendChild(button);
  }

  /**
   * @returns {HTMLInputElement}
   */
  #createImport() {
    const importButton = createFileInput(this.div);
    importButton.onchange = () => {
      const file = importButton.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        /**
         * @type {string}
         */
        const result = reader.result;
        const lines = result.split("\n");
        const questions = [];

        for (const line of lines) {
          const parts = line.split(";");
          /**
           * @type {import("./gomszab.js").QuestionType}
           */
          const question = {
            question: parts[0],
            answer1: parts[1],
            answer2: parts[2],
            answer3: parts[3],
            answer4: parts[4],
            rightAnswer: parts[5],
          };
          questions.push(question);
        }

        this.#manager.addElementList(questions);
      };
    };

    return importButton;
  }
}
