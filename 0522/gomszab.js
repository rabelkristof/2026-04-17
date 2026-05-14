/**
 * @typedef {{question: string, answer1: string, answer2: string, answer3: string, answer4: string, rightAnswer: string}} QuestionType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 * @typedef {{question: string, answer: string}} TrueFalseQuestionType
 */

/**
 *
 * @param {{id?: string, parent?: HTMLElement, classList?: string[]}} options
 * @returns {HTMLDivElement}
 */
const createDiv = (options = undefined) => {
  // 1. Létrehozunk egy divet
  // 2. Megvizsgáljuk hogy a függvény paramétere definiálva van
  //  2.1. Destrukturáljuk a függvény paraméterét
  //  2.2. Vizsgáljuk, hogy az id tulajdonság definiálva van-e
  //   2.2.1. Beállítjuk a létrehozott divnek az id-t
  //  2.3. Vizsgáljuk, hogy a parent definiálva van-e
  //   2.3.1. Hozzácsatoljuk a létrehozott div-et a parenthez
  //  2.4 Vizsgáljuk, hogy a classList definiálva van-e
  //   2.4.1. Végigiterálunk a classListen
  //    2.4.1.1 Hozzáadjuk a div-hez a css osztályt
  // 3. visszatérünk a div-el
  const div = document.createElement("div");
  if (options) {
    const { id, parent, classList } = options;
    if (id) div.id = id;
    if (parent) parent.appendChild(div);
    if (classList) {
      for (const className of classList) {
        div.classList.add(className);
      }
    }
  }

  return div;
};

/**
 *
 * @param {{id?: string, parent: HTMLElement, classList?: string[], label: string}} options
 * @returns {HTMLButtonElement}
 */
const createButton = (options) => {
  // 1. Destrukturáljuk a függvény paraméterét
  // 2. Létrehozunk egy buttont
  // 3. Beállítjuk a button innerText-jét a labelre.
  // 4. Vizsgáljuk, hogy az id tulajdonság definiálva van-e
  //  4.1. Beállítjuk a létrehozott buttonnak az id-t
  // 5. Vizsgáljuk, hogy a classList definiálva van-e
  //   5.1. Végigiterálunk a classListen
  //    5.1.1 Hozzáadjuk a button-hoz a css osztályt
  // 6. visszatérünk a div-el
  const { id, parent, classList, label } = options;
  const button = document.createElement("button");
  button.innerText = label;
  if (id) button.id = id;
  if (classList) {
    for (const className of classList) {
      button.classList.add(className);
    }
  }
  if (parent) parent.appendChild(button);

  return button;
};

/**
 *
 * @param {string[]} headerContentList
 * @param {HTMLElement} parent
 * @returns {HTMLTableSectionElement}
 */
const createTable = (headerContentList, parent) => {
  // 1. létrehozunk egy table-t
  // 2. hozzácsatoljuk a parenthez
  // 3. Létrehozunk egy theadet
  // 4. Hozzácsatoljuk a táblához
  // 5. Létrehozunk egy tablerow-t
  // 6. Hozzácsatoljuk a thead-hez
  // 7. végigiterálunk a bemeneti string listán
  //  7.1. Létrehozunk egy táblázatfejléccellát
  //  7.2. Beállítjuk az innerTextjének az aktuális ciklusváltozó értéket
  //  7.3. Hozzácsatoljuk a táblázat fejlécének a sorához
  // 8. Létrehozunk egy táblázattörzset
  // 9. Hozzácsatoljuk a táblázathoz
  // 10. visszatérünk a táblázattörzsel
  const table = document.createElement("table");
  parent.appendChild(table);
  const thead = document.createElement("thead");
  table.appendChild(thead);
  const headerRow = document.createElement("tr");
  thead.appendChild(headerRow);

  for (const header of headerContentList) {
    const th = document.createElement("th");
    th.innerText = header;
    headerRow.appendChild(th);
  }

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  return tbody;
};

/**
 *
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} list (mivel minden dolgozatnál más lesz a típusa a tömb elemeinek, ezért nem tudom megadni a típust)
 */
const clearTbodyAndHandleEmptyList = (tbody, list) => {
  // 1. Törli a tbodz paraméter tartalmát
  // 2. Vizsgálja, hogy a lista mérete 0
  // 3. Létrehoz egy sort és benne egy cellát "Üres Lista" tartalommal a createTextTableCell és createRowForTbody függvényekkel
  tbody.innerText = "";
  if (list.length == 0) {
  }
};

/**
 *
 * @param {HTMLTableSectionElement} tableSection
 * @returns {HTMLTableRowElement}
 */
const createRowForTbody = (tableSection) => {
  // 1. Létrehoz egy táblázatsort
  // 2. Hozzácsatolja a bemeneti tableSection paraméterhez
  // 3. Visszatér a sorral
  const tr = document.createElement("tr");
  tableSection.appendChild(tr);

  return tr;
};

/**
 *
 * @param {string} content
 * @param {HTMLTableRowElement} parent
 */
const createTextTableCell = (content, parent) => {
  // 1. Létrehoz egy táblázatcellát
  // 2. Beállítja az innerText-et az első paraméterre
  // 3. Hozzácsatolja a parenthez
  const td = document.createElement("td");
  td.innerText = content;
  parent.appendChild(td);

  return td;
};

/**
 *
 * @param {string} content
 * @param {HTMLTableRowElement} parent
 * @returns {HTMLButtonElement}
 */
const createEditTableCell = (parent) => {
  // 1. Létrehoz egy táblázatcellát
  // 2. Hozzáfűz egy gombot Szerekesztés felirattal a createButton segítségével a táblázatcellához
  // 3. Hozzácsatolja létrehozott cellát a parenthez
  // 4. visszatér a létrehozott gombbal
  const td = document.createElement("td");
  const button = createButton({label: "Szerkesztés", parent: td});
  parent.appendChild(td);

  return button
};

/**
 * @callback CreateFieldsCallback
 * @param {HTMLFormElement} form a form amihez hozzafuzzuk
 * @returns {void}
 * 
 * @callback SubmitEventListener
 * @param {Event} event submitesemeny
 * @returns {void}

 * 
 * @param {CreateFieldsCallback} createCallback 
 * @param {SubmitEventListener} eventlistener 
 * @param {{button: HTMLButtonElement, form: HTMLFormElement}}  
 */
const createForm = (createCallback, eventlistener) => {
  // 1. Létrehoz egy form elemet
  // 2. meghívja a függvény első paraméterét a létrehozott formal
  // 3. létrehoz egy gombot
  // 4. Beállítja a gomb szövegének a "Küldés" szöveget
  // 5. hozzácsatolja a gombot a formhoz
  // 6. beállítja a form submit eseménykezelőjének a függvény második paraméterét
  // 7. Visszatér egy objektummal aminek a form tulajdonsága a létrehozott formot, a button tulajdonsága a létrehozott gombot tartalmazza
  const form = document.createElement("form");
  createCallback(form);
  const button = document.createElement("button");
  button.innerText = "Küldés";
  form.appendChild(button);
  form.addEventListener("submit", eventlistener);

  return { form, button };
};

/**
 *
 * @param {{id: string, name: string, labelContent: string, parent: HTMLElement}} param A parameterobjektum ami alapjan osszeallitja az inputot tartalmazo divet az errorral
 * @returns {{errorElement: HTMLElement, input: HTMLInputElement}} Az error html elem, es az input html elem
 */
const createInputField = ({ id, name, labelContent, parent }) => {
  // 1. Létrehoz egy divet és csatolja a függvény paraméterének parent tulajdonságához a createDiv függvény segítségével
  // 2. Létrehoz egy labelt
  // 3. Beállítja a label szövegének a függvény paraméterének labelContent tulajdonságán található értéket
  // 4. Beállítja a label htmlFor tulajdonságának a függvény paraméterének id tulajdonságán található értéket
  // 5. A labelt a divhez csatolja
  // 6. Létrehoz egy input elemet
  // 7. Csatolja az inputot a div elemhez
  // 8. Az input type értékét text-re állítja
  // 9. Beállítja az input id értékének a függvény paraméterének id tulajdonságán található értéket
  // 10. Beállítja az input name értékének a függvény paraméterének name tulajdonságán található értéket
  // 11. Létrehoz egy errorElementDiv-et a createDiv függvény segítségével, ahol a parent a korábban létrehozott div, a classList pedig egy tömb ami tartalmazza az error string elemet
  // 12. Visszatér egy objektummal, ahol az errorElement tulajdonság a létrehozott errordivet, az input tulajdonság pedig a létrehozott inputot tartalmazza
  const div = createDiv({ parent });
  const label = document.createElement("label");
  label.innerText = labelContent;
  label.htmlFor = id;
  div.appendChild(label);

  const input = document.createElement("input");
  input.type = "text";
  input.id = id;
  input.name = name;
  div.appendChild(input);

  const errorElementDiv = createDiv({ parent, classList: ["error"] });

  return { errorElement: errorElementDiv, input };
};

/**
 *
 * @param {HTMLElement} parent
 * @returns {HTMLInputElement}
 */
const createFileInput = (parent) => {
  // 1. Létrehoz egy input elemet
  // 2. beállítja a file típust
  // 3. Hozzácsatolja a parent paraméterhez
  // 4. visszatér a létrehozott inputtal
  const input = document.createElement("input");
  input.type = "file";
  parent.appendChild(input);

  return input;
};

/**
 *
 * @param {HTMLElement} parent
 * @param {string} content
 */
const createSpan = (parent, content) => {
  // 1. Létrehoz egy span elemet
  // 2. Beállítja a második paramétert a span tartalmának
  // 3. Hozzácsatolja az első paraméterhez a létrehozott span elemet
  const span = document.createElement("span");
  span.innerText = content;
  parent.appendChild(span);
};

/**
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
const show = (element) => {
  // 1. a bemeneti paraméter classList tulajdonságából törli a hidden css classt.
};

/**
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
const hide = (element) => {
  // 1. a bemeneti paraméter classList tulajdonságához hozzáadja a hidden css classt.
};

/**
 *
 * @param {{id: string, label: string, name: string}} param0
 * @returns {HTMLElement}
 */
const createRadioButton = ({ id, label, name }) => {
  // 1. Létrehoz egy div elemet
  // 2. létrehoz egy input elemet
  // 3. Beállítja az input name tulajdonságának a bemeneti paraméter name tulajdonságát
  // 4. Beállítja az input value tulajdonságának a bemeneti paraméter id tulajdonságát
  // 5. Beállítja az input id tulajdonságának a bemeneti paraméter id tulajdonságát
  // 6. Beállítja az input type tulajdonságának a radio stringet
  // 7. A létrehozott div elemhez csatolja a létrehozott inputot
  // 8. Létrehoz egy label elementet
  // 9. Beállítja a label element innerText tulajdonságának a bemeneti paraméter label tulajdonságát
  // 10. Beállítja a label for tulajdonságának a bemeneti paraméter id tulajdonságát
  // 11. hozzácsatolja a labelt a létrehozott div-hez
  // 12. Visszatér a létrehozott div-el
};

export {
  createDiv,
  createButton,
  createTable,
  clearTbodyAndHandleEmptyList,
  createTextTableCell,
  createRowForTbody,
  createForm,
  createInputField,
  createFileInput,
  createEditTableCell,
  createSpan,
  hide,
  show,
  createRadioButton,
};
