import { createForm, createInputField } from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

/**
 * @typedef {{id: number, question: string, answer: string}} EditTrueFalseQuestionType
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
   * @type {EditTrueFalseQuestionType}
   */
  #editQuestion;

  /**
   * @param {string} id
   * @param {QuestionManager} manager
   * @param {import("./gomszab.js").FormFieldType[]} formFieldList
   */
  constructor(id, manager, formFieldList) {
    super(id);
    this.#formInputList = [];
    this.#manager = manager;

    const { form, button } = createForm(
      (form) => {
        const status = document.createElement("span");
        form.appendChild(status);
        this.#manager.addStatusCallback = (message) => {
          status.innerText = message;
          setTimeout(() => {
            status.innerText = "";
          }, 1000);
        };

        for (const field of formFieldList) {
          this.#formInputList.push(
            new FormInput(field.id, field.name, field.label, form),
          );
        }
      },
      (e) => {
        e.preventDefault();

        /**
         * @type {import("./gomszab.js").TrueFalseQuestionType}
         */
        const question = {};
        let valid = true;
        for (const field of this.#formInputList) {
          if (!field.validate()) {
            valid = false;
          }
          question[field.name] = field.value;
        }

        if (valid) {
          this.#form.reset();
          if (this.#editQuestion) {
            this.#manager.updateElement(this.#editQuestion.id, question);
            this.#editQuestion = null;
            this.#submitButton.innerText = "Küldés";
          } else {
            this.#manager.addElement(question);
          }
        }
      },
    );

    this.#submitButton = button;
    this.#form = form;
    this.div.appendChild(this.#form);

    this.activateCallback = (id) => {
      if (id === undefined) {
        return;
      }

      this.#submitButton.innerText = "Szerkesztés";
      const question = this.#manager.getQuestionTypeById(id);
      this.#editQuestion = { id, ...question };

      for (const key in this.#editQuestion) {
        for (const field of this.#formInputList) {
          if (field.name === key) {
            field.value = this.#editQuestion[key];
          }
        }
      }
    };
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
    this.#name = name;

    const { errorElement, input } = createInputField({
      id,
      name,
      labelContent,
      parent,
    });
    this.#errorDiv = errorElement;
    this.#input = input;
  }

  /**
   * @returns {boolean}
   */
  validate() {
    if (this.value) {
      this.#errorDiv.innerText = "";
      return true;
    } else {
      this.#errorDiv.innerText = "Mező kitöltése kötelező";
      return false;
    }
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * @returns {string}
   */
  get value() {
    return this.#input.value;
  }

  /**
   * @param {string} newVal
   */
  set value(newVal) {
    this.#input.value = newVal;
  }
}
