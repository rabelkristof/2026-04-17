/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} type
 * @param {HTMLElement} parent
 * @returns {HTMLElementTagNameMap[T]}
 */
export function createElement(type, parent) {
  const elem = document.createElement(type);
  parent.appendChild(elem);

  return elem;
}
