import { createDiv, createForm, createInputField } from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

/**
 * @typedef {{id: number, question: string, answer1: string, answer2: string, answer3: string, answer4: string, rightAnswer: string}} EditQuestionType
 */

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
   * @param {import("./gomszab").FormFieldType[]} formFields
   */
  constructor(id, manager, formFields) {
    super(id);
    this.#manager = manager;
    this.#formInputList = [];

    const { form, button } = createForm(
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
        if (!question) return;

        if (this.#editQuestion) {
          this.#manager.updateElement(this.#editQuestion.id, question);
          this.#editQuestion = null;
        } else {
          this.#manager.addElement(question);
        }

        this.#form.reset();
      },
    );
    this.#form = form;
    this.#submitButton = button;
    this.div.appendChild(this.#form);

    this.activateCallback = (questionId) => {
      if (questionId === undefined) {
        this.#submitButton.innerText = "Küldés";
        return;
      }
      this.#submitButton.innerText = "Szerkesztés";

      const question = this.#manager.getQuestionTypeById(questionId);
      this.#editQuestion = { id: questionId, ...question };

      for (const field of this.#formInputList) {
        for (const key in question) {
          if (field.name == key) {
            field.value = question[key];
          }
        }
      }
    };
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

  /**
   * @param {string} newVal
   */
  set value(newVal) {
    this.#input.value = newVal;
  }
}
