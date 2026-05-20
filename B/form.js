import { createForm, createInputField, createSpan } from "./gomszab.js";
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
   * @param {import("./gomszab.js").FormFieldType[]} formFieldList
   */
  constructor(id, manager, formFieldList) {
    super(id);
    this.#formInputList = [];
    this.#manager = manager;

    const { form, button: _ } = createForm(
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

        if (valid) this.#manager.addElement(question);
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
}
