import { QuestionManager } from "./manager.js";
import { NavigationBar } from "./navbar.js";
import { Table } from "./table.js";

import data from "./data.json" with { type: "json" };
import { FormController } from "./form.js";
import { ImportExport } from "./importexport.js";
import { QuizManager } from "./quizmanager.js";
import { QuizView } from "./quizview.js";

const navbar = new NavigationBar("navbar");
const manager = new QuestionManager(data.questions);
const table = new Table("table", manager, data.tableHeader, navbar);
const form = new FormController("form", manager, data.formFieldList);
const importExport = new ImportExport("importexport", manager);
const quizManager = new QuizManager(manager);
const quiz = new QuizView("quiz", quizManager);

navbar.addViewElement("Táblázat", table);
navbar.addViewElement("Űrlap", form);
navbar.addViewElement("Import/export", importExport);
navbar.addViewElement("Kvíz", quiz);
navbar.appendTo(document.body);
