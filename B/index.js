import data from "./data.json" with { type: "json" };
import { FormController } from "./form.js";
import { ImportExport } from "./importexport.js";
import { NavigationBar } from "./navbar.js";
import { QuestionManager } from "./questionmanager.js";
import { Table } from "./table.js";

const navbar = new NavigationBar("navbar");
const questionmanager = new QuestionManager(data.questions);
const table = new Table("table", questionmanager, data.tableHeader);
const form = new FormController("form", questionmanager, data.formFieldList);
const importExport = new ImportExport("importexport", questionmanager);

navbar.addViewElement("Táblázat", table);
navbar.addViewElement("Űrlap", form);
navbar.addViewElement("Import/export", importExport);

navbar.navigate("table");
navbar.appendTo(document.body);

table.appendTo(document.body);
form.appendTo(document.body);
importExport.appendTo(document.body);
