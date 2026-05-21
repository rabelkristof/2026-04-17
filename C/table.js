import {
  clearTbodyAndHandleEmptyList,
  createEditTableCell,
  createRowForTbody,
  createTable,
  createTextTableCell,
} from "./gomszab.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";
import { NavigationBar } from "./navbar.js";

export class Table extends ViewElement {
  /**
   * @type {QuestionManager}
   */
  #manager;

  /**
   * @type {NavigationBar}
   */
  #navigationBar;

  /**
   * @param {string} id
   * @param {QuestionManager} manager
   * @param {string[]} headerString
   * @param {NavigationBar} navigationBar
   */
  constructor(id, manager, headerString, navigationBar) {
    super(id);
    this.#manager = manager;
    this.#navigationBar = navigationBar;

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

        const editButton = createEditTableCell(tr);
        editButton.onclick = () => {
          this.#navigationBar.navigate("form", question.id);
        };
      }
    };

    this.activateCallback = () => {
      this.#manager.getAllElement();
    };
  }
}
