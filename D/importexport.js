import { createButton, createDiv, createFileInput } from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
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

    this.#createImport();
    this.#createExport();

    this.#manager.importResultCallback = (message) => {
      this.#resultDiv.innerText = message;
      setTimeout(() => {
        this.#resultDiv.innerText = "";
      }, 1000);
    };
  }

  /**
   * @returns {void}
   */
  #createExport() {
    const button = createButton({ parent: this.div, label: "Export" });
    button.addEventListener("click", () => {
      const exportString = this.#manager.getExportContent();
      const blob = new Blob([exportString]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "export.csv";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /**
   * @returns {void}
   */
  #createImport() {
    const fileInput = createFileInput(this.div);

    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = () => {
        /**
         * @type {string}
         */
        const result = reader.result;
        const lines = result.split("\n");

        /**
         * @type {import("./gomszab").QuestionType[]}
         */
        const questions = [];
        for (const line of lines) {
          const parts = line.split(";");
          /**
           * @type {import("./gomszab").QuestionType}
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
    });

    return fileInput;
  }
}
