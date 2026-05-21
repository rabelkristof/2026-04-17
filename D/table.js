import {
  clearTbodyAndHandleEmptyList,
  createEditTableCell,
  createRowForTbody,
  createTable,
  createTextTableCell,
} from "./gomszab.js";
import { NavigationBar } from "./navbar.js";
import { QuestionManager } from "./questionmanager.js";
import { ViewElement } from "./viewelement.js";

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
      clearTbodyAndHandleEmptyList(tbody, list);

      for (const question of list) {
        const tr = createRowForTbody(tbody);
        createTextTableCell(question.question, tr);
        createTextTableCell(question.answers[0], tr);
        createTextTableCell(question.answers[1], tr);
        createTextTableCell(question.answers[2], tr);
        createTextTableCell(question.answers[3], tr);
        createTextTableCell(question.rightAnswer, tr);
        const editButton = createEditTableCell(tr);
        editButton.addEventListener("click", () => {
          this.#navigationBar.navigate("form", question.id);
        });
      }
    };

    this.activateCallback = () => {
      this.#manager.getAllElement();
    };
  }
}
