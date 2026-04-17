import { QuestionManager } from "./manager.js";
import { NavigationBar } from "./navbar.js";
import { Table } from "./table.js";

import data from "./data.json" with { type: "json" };

const navbar = new NavigationBar("navbar");
const manager = new QuestionManager(data.questions);
const table = new Table("table", manager, data.tableHeader);

manager.getAllElement();
navbar.addViewElement("Táblázat", table);
navbar.appendTo(document.body);
