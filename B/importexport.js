import { ViewElement } from "./viewelement.js";
import { QuestionManager } from "./questionmanager.js";
import { createButton, createFileInput } from "./gomszab.js";

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
    this.#resultDiv = document.createElement("div");
    this.div.appendChild(this.#resultDiv);

    this.#manager.importResultCallback = (message) => {
      this.#resultDiv.innerText = message;
      setTimeout(() => {
        this.#resultDiv.innerText = "";
      }, 1000);
    };

    const fileInput = this.#createImport();
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        /**
         * @type {import("./gomszab.js").TrueFalseQuestionType[]}
         */
        const questions = [];
        /**
         * @type {string[]}
         */
        const lines = reader.result.split("\n");

        for (const line of lines) {
          const parts = line.split(";");
          questions.push({ question: parts[0], answer: parts[1] });
        }

        this.#manager.addElementList(questions);
      };
    });

    this.#createExport();
  }

  /**
   * @returns {HTMLInputElement}
   */
  #createImport() {
    const file = createFileInput(this.div);

    return file;
  }

  /**
   * @returns {void}
   */
  #createExport() {
    const button = createButton({ parent: this.div, label: "Export" });
    button.addEventListener("click", () => {
      const a = document.createElement("a");
      const exportString = this.#manager.getExportContent();
      const blob = new Blob([exportString]);
      const url = URL.createObjectURL(blob);
      a.download = "export.csv";
      a.href = url;
      a.click();

      URL.revokeObjectURL(url);
    });
  }
}
