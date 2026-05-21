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
      clearTbodyAndHandleEmptyList(
        tbody,
        list.map((q) => {
          return { question: q.question, answer: q.answer };
        }),
      );

      for (const question of list) {
        const tr = createRowForTbody(tbody);
        createTextTableCell(question.question, tr);
        createTextTableCell(question.answer ? "igaz" : "nem igaz", tr);
      }
    };

    this.activateCallback = () => {
      this.#manager.getAllElement();
    };
  }
}
