import { createDiv, createForm, createInputField } from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

export class FormController extends ViewElement {
  /**
   * @type {FormField[]}
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

    const { form, button: _ } = createForm(
      (form) => {
        const messageDiv = createDiv({ parent: form });
        this.#manager.addStatusCallback = (message) => {
          messageDiv.innerText = message;
          setTimeout(() => {
            messageDiv.innerText = "";
          }, 1000);
        };

        for (const field of formFields) {
          this.#formInputList.push(
            new FormField(field.id, field.name, field.label, form),
          );
        }
      },
      (e) => {
        e.preventDefault();

        const question = this.#createElement();

        if (question) {
          this.#manager.addElement(question);
          this.#form.reset();
        }
      },
    );
    this.#form = form;
    this.div.appendChild(this.#form);
  }

  /**
   * @returns {import("./gomszab").QuestionType}
   */
  #createElement() {
    /**
     * @type {import("./gomszab").QuestionType}
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
      return question;
    } else {
      return null;
    }
  }
}

class FormField {
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
    const { input, errorElement } = createInputField({
      id,
      name,
      labelContent,
      parent,
    });

    this.#input = input;
    this.#errorDiv = errorElement;
    this.#name = name;
  }

  /**
   * @returns {boolean}
   */
  validate() {
    if (this.value == "") {
      this.#errorDiv.innerText = "Kötelező mező";

      return false;
    } else {
      this.#errorDiv.innerText = "";

      return true;
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
