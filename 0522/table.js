import {
  clearTbodyAndHandleEmptyList,
  createEditTableCell,
  createRowForTbody,
  createTable,
  createTextTableCell,
} from "./gomszab.js";
import { QuestionManager } from "./manager.js";
import { NavigationBar } from "./navbar.js";
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
   *
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
        for (const answer of question.answers) {
          createTextTableCell(answer, tr);
        }
        createTextTableCell(question.rightAnswer, tr);
        const button = createEditTableCell(tr);
        button.addEventListener("click", () => {
          this.#navigationBar.navigate("form", question.id);
        });
      }
    };

    this.activateCallback = () => {
      this.#manager.getAllElement();
    };
  }
}
