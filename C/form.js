import { createDiv, createForm, createInputField } from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

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
   * @param {string} id
   * @param {QuestionManager} manager
   * @param {import("./gomszab").FormFieldType[]} formFields
   */
  constructor(id, manager, formFields) {
    super(id);
    this.#manager = manager;
    this.#formInputList = [];

    const resultDiv = createDiv({ parent: this.div });
    this.#manager.addStatusCallback = (message) => {
      resultDiv.innerText = message;
      setTimeout(() => {
        resultDiv.innerText = "";
      }, 1000);
    };

    const { form, button: _ } = createForm(
      (form) => {
        for (const field of formFields) {
          this.#formInputList.push(
            new FormInput(field.id, field.name, field.label, form),
          );
        }
      },
      (e) => {
        e.preventDefault();

        /**
         * @type {import("./gomszab").TrueFalseQuestionType}
         */
        const question = {};
        let valid = true;
        for (const field of this.#formInputList) {
          if (field.validate()) {
            question[field.name] = field.value;
          } else {
            valid = false;
          }
        }

        if (valid) {
          this.#manager.addElement(question);
          this.#form.reset();
        }
      },
    );
    this.#form = form;
    this.div.appendChild(this.#form);
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
   * @param {string} id
   * @param {string} name
   * @param {string} labelContent
   * @param {HTMLFormElement} parent
   */
  constructor(id, name, labelContent, parent) {
    const { errorElement, input } = createInputField({
      id,
      name,
      labelContent,
      parent,
    });
    this.#errorDiv = errorElement;
    this.#input = input;
    this.#name = name;
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
}
