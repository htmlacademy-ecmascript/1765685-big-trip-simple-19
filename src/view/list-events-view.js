import { createElement } from '../render.js';

function createListEventsTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListEventsView {
  #element = null;

  get template() {
    return createListEventsTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
