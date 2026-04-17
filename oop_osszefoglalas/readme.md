# Összefoglalás a dolgozathoz

## 01_inheritance
Egyszerű leszármazás gyakorlása

## 02_navbar_radio
Rádiogombos navigáció gyakorlása

## 03_navbar_button
Gombos navigáció gyakorlása

## 04_render_callback
Renderelő callback gyakorlása

## 05_activate_callback
A navigáció után lefutó activateCallback gyakorlása

## 06_com_table_form
A táblázat és a form manageren keresztüli kommunikációja activateCallbackel

## 07a_navbar_param 
Paraméteres navigáció gyakorlása (rádiógombbal). A 07b_navbar_param a gombos paraméteres navigáció. A korábbi
Architectura ábrák és a mostani implementációk alapján javasolt elkészíteni mind a class diagrammot, mind pedig az implementációt.

## 08a_kviz (mintadoga)
A korábbi órán megoldott kvíz alkalmazásunkat integráljuk a táblázatkezelő alkalmazásunkba

## 08b_igaz_hamis (mintadoga)
A korábbi órán megoldott igaz_hamis alkalmazásunkat integráljuk a táblázatkezelő alkalmazásunkba. A 08a_kvíz alapján állítsuk elő az architecturális ábrát, valamint a felületet, valamint implementáljuk az alkalmazást.

## +kviz
Korábban megosztott kvíz alkalmazáshoz tartozó fájlok

## +igazhamis
Korábban megosztott igaz/hamis alkalmazáshoz tartozó fájlok

## Plussz feladatok és kérdések
1. Mi a különbség a gombos navigáció és a rádigombos navigáció között a DOM-tree szempontjából?
2. Hogyan oldanánk meg a gombos navigációt, hogy hasonló legyen a renderelési logika a rádiogomboshoz?
3. Hogyan lehetne megoldani, hogy a gombos navigáció esetében a viewContainer a gombokat tartalmazó div mellett legyen?
4. 08a_kvíz: A formon a helyes választ legördülőmenüből válasszuk ki a korábbi 4 megadott válasz alapján. Amikor elveszíti az input a focust, akkor egy [focusout](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event) event jön létre 
5. 08b_igaz_hamis: Vegyük fel az állítás negáltját is az entításhoz, és amikor elkérjük a feladatokat, akkor vagy az egyik állítást, vagy a másik állítást fogja látni a felhasználó. A kiértékelésnél az eltárolt választ az alapján számoljuk, hogy melyik állítást kapta.

## Egyéb
A segédfüggvényeket egy classoktól független fájlban tároljátok, és legyen hozzá jsdoc. A legjobbakat összeválogatva kerülnek be a dolgozat ségedfájljába (a dolgozat előtti héten).

