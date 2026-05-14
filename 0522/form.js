import {
  createDiv,
  createForm,
  createInputField,
  createSpan,
} from "./gomszab.js";
import { QuestionManager } from "./manager.js";
import { ViewElement } from "./viewelement.js";

/**
 * @typedef {{id: number, question: string, answer1: string, answer2: string, answer3: string, answer4: string, rightAnswer: string}} EditQuestionType
 */

export class FormController extends ViewElement {
  /**
   * @type {FormInput[]}
   */
  #formInputList;

  /**
   * @type {QuestionManager}
   */
  #manager;

  /**
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * @type {HTMLButtonElement}
   */
  #submitButton;

  /**
   * @type {EditQuestionType}
   */
  #editQuestion;

  /**
   * @param {string} id
   * @param {QuestionManager} manager
   * @param {import("./gomszab.js").FormFieldType[]} formFields
   */
  constructor(id, manager, formFields) {
    super(id);
    this.#manager = manager;
    this.#formInputList = [];
    this.#form = createForm(
      (form) => {
        const span = document.createElement("span");
        form.appendChild(span);

        this.#manager.addStatusCallback = (message) => {
          span.innerText = message;
          setTimeout(() => {
            span.innerText = "";
          }, 1000);
        };

        for (const field of formFields) {
          this.#formInputList.push(
            new FormInput(field.id, field.name, field.label, form),
          );
        }
      },
      (e) => {
        e.preventDefault();
        this.#createElement();
      },
    ).form;

    this.activateCallback = (questionId) => {
      if (!questionId) return;

      const question = this.#manager.getQuestionTypeById(questionId);
    }

    this.div.appendChild(this.#form);
  }

  /**
   * @returns {import("./gomszab.js").QuestionType}
   */
  #createElement() {
    let valid = true;
    /**
     * @type {import("./gomszab.js").QuestionType}
     */
    const question = {};
    for (const input of this.#formInputList) {
      question[input.name] = input.value;
      if (!input.validate()) {
        valid = false;
      }
    }

    if (valid) {
      this.#manager.addElement(question);
      this.#form.reset();
    }

    return question;
  }
}

class FormInput {
  /**
   * @type {HTMLDivElement}
   */
  #errorDiv;

  /**
   * @type {HTMLInputElement}
   */
  #input;

  /**
   * @type {string}
   */
  #name;

  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} labelContent
   * @param {HTMLFormElement} parent
   */
  constructor(id, name, labelContent, parent) {
    const result = createInputField({ id, name, labelContent, parent });
    this.#name = name;
    this.#input = result.input;
    this.#errorDiv = result.errorElement;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#input.value;
  }

  /**
   * @param {string} newVal 
   */
  set value(newVal) {
    this.#input.value;
  }

  /**
   * @returns {boolean} Valid-e
   */
  validate() {
    this.#errorDiv.innerText = "";
    if (this.#input.value) {
      return true;
    } else {
      this.#errorDiv.innerText = "Hiányos mező";
      return false;
    }
  }
}
