import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';
import EmptyListEventsView from '../view/empty-list-events-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #listEventsView = new ListEventsView();
  #emptyListEventsView = new EmptyListEventsView();
  #eventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsEvent = null;
  #destinationsEvent = null;
  #offersEvent = null;
  #eventPresenter = new Map();

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

    if (this.#pointsEvent.length === 0) {
      render(this.#emptyListEventsView, this.#eventsContainer);
    } else {
      render(this.#listEventsView, this.#eventsContainer);
      render(new SortEventsView(), this.#listEventsView.element);

      for (let i = 0; i < this.#pointsEvent.length; i++) {
        this.#renderEvent(
          this.#pointsEvent[i],
          this.#destinationsEvent,
          this.#offersEvent
        );
      }
    }
  }

  #renderEvent(pointsEvent, destinationsEvent, offersEvent) {
    const pointPresenter = new PointPresenter({
      listEventsView: this.#listEventsView.element,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(pointsEvent, destinationsEvent, offersEvent);
    this.#eventPresenter.set(pointsEvent.id, pointPresenter);
  }

  #clearTaskList() {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };
}
