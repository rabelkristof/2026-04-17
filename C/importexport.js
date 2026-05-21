import { ViewElement } from "./viewelement.js";
import { QuestionManager } from "./questionmanager.js";
import { createButton, createDiv, createFileInput } from "./gomszab.js";

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

    const fileInput = this.#createImport();
    this.#createExport();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = () => {
        /**
         * @type {string}
         */
        const text = reader.result;
        const lines = text.split("\n");
        /**
         * @type {import("./gomszab.js").TrueFalseQuestionType[]}
         */
        const questions = [];

        for (const line of lines) {
          /**
           * @type {import("./gomszab.js").TrueFalseQuestionType}
           */
          const question = {};
          const parts = line.split(";");
          question.question = parts[0];
          question.answer = parts[1];

          questions.push(question);
        }

        this.#manager.addElementList(questions);
      };
    };
  }

  /**
   * @returns {HTMLInputElement}
   */
  #createImport() {
    const input = createFileInput(this.div);

    return input;
  }

  #createExport() {
    const button = createButton({ parent: this.div, label: "Export" });

    button.onclick = () => {
      const exportString = this.#manager.getExportContent();
      const blob = new Blob([exportString]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "export.csv";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    };
  }
}
