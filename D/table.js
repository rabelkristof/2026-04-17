import {
  clearTbodyAndHandleEmptyList,
  createRowForTbody,
  createTable,
  createTextTableCell,
} from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

export class Table extends ViewElement {
  /**
   * @type {QuestionManager}
   */
  #manager;

  /**
   * @param {string} id
   * @param {QuestionManager} manager
   * @param {string[]} headerString
   */
  constructor(id, manager, headerString) {
    super(id);
    this.#manager = manager;

    const tbody = createTable(headerString, this.div);
    this.#manager.renderCallback = (list) => {
      clearTbodyAndHandleEmptyList(tbody, list);

      for (const question of list) {
        const tr = createRowForTbody(tbody);
        createTextTableCell(question.question, tr);
        createTextTableCell(question.answers[0], tr);
        createTextTableCell(question.answers[1], tr);
        createTextTableCell(question.answers[2], tr);
        createTextTableCell(question.answers[3], tr);
        createTextTableCell(question.rightAnswer, tr);
      }
    };

    this.activateCallback = () => {
      this.#manager.getAllElement();
    };
  }
}
