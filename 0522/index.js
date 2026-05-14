import { QuestionManager } from "./manager.js";
import { NavigationBar } from "./navbar.js";
import { Table } from "./table.js";

import data from "./data.json" with { type: "json" };
import { FormController } from "./form.js";
import { ImportExport } from "./importexport.js";

const navbar = new NavigationBar("navbar");
const manager = new QuestionManager(data.questions);
const table = new Table("table", manager, data.tableHeader, navbar);
const form = new FormController("form", manager, data.formFieldList);
const importExport = new ImportExport("importexport", manager);

manager.getAllElement();
navbar.addViewElement("Táblázat", table);
navbar.addViewElement("Űrlap", form);
navbar.addViewElement("Import/export", importExport);
navbar.appendTo(document.body);
