import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';
import NewEventView from '../view/new-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import {render} from '../render.js';


export default class EventsPresenter {
  listEventsView = new ListEventsView();
  constructor ({eventsContainer, pointsModel, destinationsModel, offersModel}) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsEvent = [...this.pointsModel.getEvents()];
    this.destinationsEvent = [...this.destinationsModel.getDestinations()];
    this.offersEvent = [...this.offersModel.getOffers()];
  }

  init() {
    render(new SortEventsView(), this.eventsContainer);
    render(this.listEventsView, this.eventsContainer);
    render(new NewEventView(this.pointsEvent[0], this.destinationsEvent, this.offersEvent), this.listEventsView.getElement());
    render(new EditEventView(this.pointsEvent[1], this.destinationsEvent, this.offersEvent), this.listEventsView.getElement());
    for (let i = 2; i < this.pointsEvent.length; i++) {
      render(new EventView(this.pointsEvent[i], this.destinationsEvent, this.offersEvent), this.listEventsView.getElement());
    }
  }
}

