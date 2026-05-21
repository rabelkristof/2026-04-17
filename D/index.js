import data from "./data.json" with { type: "json" };
import { NavigationBar } from "./navbar.js";
import { QuestionManager } from "./questionmanager.js";
import { Table } from "./table.js";

const navbar = new NavigationBar("navbar");
const questionmanager = new QuestionManager(data.questions);
const table = new Table("table", questionmanager, data.tableHeader);

navbar.addViewElement("Táblázat", table);

navbar.appendTo(document.body);
table.appendTo(document.body);

navbar.navigate("table");
