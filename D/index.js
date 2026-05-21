import data from "./data.json" with { type: "json" };
import { FormController } from "./form.js";
import { ImportExport } from "./importexport.js";
import { NavigationBar } from "./navbar.js";
import { QuestionManager } from "./questionmanager.js";
import { QuizManager } from "./quizmanager.js";
import { QuizView } from "./quizview.js";
import { Table } from "./table.js";

const navbar = new NavigationBar("navbar");
const questionmanager = new QuestionManager(data.questions);
const table = new Table("table", questionmanager, data.tableHeader, navbar);
const form = new FormController("form", questionmanager, data.formFieldList);
const importexport = new ImportExport("importexport", questionmanager);
const quizmanager = new QuizManager(questionmanager);
const quiz = new QuizView("quiz", quizmanager);

navbar.appendTo(document.body);

navbar.addViewElement("Táblázat", table);
navbar.addViewElement("Űrlap", form);
navbar.addViewElement("Import/export", importexport);
navbar.addViewElement("Kvíz", quiz);

navbar.navigate("table");
