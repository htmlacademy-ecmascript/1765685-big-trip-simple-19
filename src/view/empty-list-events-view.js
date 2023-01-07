import AbstractView from '../framework/view/abstract-view.js';

function createListEventsTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyListEventsView extends AbstractView {

  get template() {
    return createListEventsTemplate();
  }
}
