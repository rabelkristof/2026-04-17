import { ClassA, ClassB } from "./classes.js";

const a = new ClassA("child");
const b = new ClassB("childB");

a.appendTo(document.body);
b.appendTo(document.body);
