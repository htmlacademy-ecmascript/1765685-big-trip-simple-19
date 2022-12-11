import {render} from '../render.js';
import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';
import NewEventView from '../view/new-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';

export default class EventsPresenter {
  listEventsView = new ListEventsView();
  EVENTS_COUNT = 3;

  constructor ({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortEventsView(), this.eventsContainer);
    render(this.listEventsView, this.eventsContainer);
    render(new NewEventView(), this.listEventsView.getElement());
    render(new EditEventView(), this.listEventsView.getElement());
    for (let i = 1; i <= this.EVENTS_COUNT; i++) {
      render(new EventView(), this.listEventsView.getElement());
    }
  }
}


