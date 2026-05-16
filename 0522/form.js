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

    const { form, button: submitButton } = createForm(
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
        let valid = true;
        for (const input of this.#formInputList) {
          if (!input.validate()) {
            valid = false;
          }
        }
        if (!valid) return;

        const question = this.#createElement();
        if (this.#editQuestion) {
          this.#manager.updateElement(this.#editQuestion.id, question);
        } else {
          this.#manager.addElement(question);
        }

        this.#form.reset();
      },
    );

    this.#form = form;
    this.#submitButton = submitButton;

    this.activateCallback = (questionId) => {
      if (questionId === undefined) {
        this.#editQuestion = null;
        this.#submitButton.innerText = "Küldés";
        return;
      }

      this.#submitButton.innerText = "Szerkesztés";
      const question = this.#manager.getQuestionTypeById(questionId);
      this.#editQuestion = { id: questionId, ...question };
      for (const key in this.#editQuestion) {
        for (const input of this.#formInputList) {
          if (input.name == key) {
            input.value = this.#editQuestion[key];
          }
        }
      }
    };

    this.div.appendChild(this.#form);
  }

  /**
   * @returns {import("./gomszab.js").QuestionType}
   */
  #createElement() {
    /**
     * @type {import("./gomszab.js").QuestionType}
     */
    const question = {};
    for (const input of this.#formInputList) {
      question[input.name] = input.value;
    }

    for (const input of this.#formInputList) {
      question[input.name] = input.value;
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
    this.#input.value = newVal;
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
