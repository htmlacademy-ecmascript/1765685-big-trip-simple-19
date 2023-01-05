import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  #listEventsView = new ListEventsView();
  #eventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsEvent = null;
  #destinationsEvent = null;
  #offersEvent = null;

  constructor({
    eventsContainer,
    pointsModel,
    destinationsModel,
    offersModel,
  }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#pointsEvent = [...this.#pointsModel.events];
    this.#destinationsEvent = [...this.#destinationsModel.destinations];
    this.#offersEvent = [...this.#offersModel.offers];
    render(new SortEventsView(), this.#eventsContainer);
    render(this.#listEventsView, this.#eventsContainer);
    for (let i = 0; i < this.#pointsEvent.length; i++) {
      this.#renderEvent(
        this.#pointsEvent[i],
        this.#destinationsEvent,
        this.#offersEvent
      );
    }
  }

  #renderEvent(event, destinations, offers) {
    const eventPoint = new EventView(event, destinations, offers);
    const editEventPoint = new EditEventView(event, destinations, offers);
    const replaceCardToForm = () => {
      this.#listEventsView.element.replaceChild(
        editEventPoint.element,
        eventPoint.element
      );
    };

    const replaceFormToCard = () => {
      this.#listEventsView.element.replaceChild(
        eventPoint.element,
        editEventPoint.element
      );
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    eventPoint.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      });

    editEventPoint.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editEventPoint.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);
      });

    render(eventPoint, this.#listEventsView.element);
  }
}
