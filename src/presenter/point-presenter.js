import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listEventsView = null;
  #eventPoint = null;
  #editEventPoint = null;
  #event = null;
  #destinations = null;
  #offers = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ listEventsView, onModeChange }) {
    this.#listEventsView = listEventsView;
    this.#handleModeChange = onModeChange;
  }

  init(event, destinations, offers) {
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevTaskComponent = this.#eventPoint;
    const prevTaskEditComponent = this.#editEventPoint;

    this.#eventPoint = new EventView(
      this.#event,
      this.#destinations,
      this.#offers,
      this.#handleEditClick
    );

    this.#editEventPoint = new EditEventView(
      this.#event,
      this.#destinations,
      this.#offers,
      this.#handleFormSubmit
    );

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#eventPoint, this.#listEventsView);
      return;
    }

    // if (this.#listEventsView.contains(prevTaskComponent.element)) {
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPoint, prevTaskComponent);
    }

    // if (this.#listEventsView.contains(prevTaskEditComponent.element)) {
    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventPoint, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this.#eventPoint);
    remove(this.#editEventPoint);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm() {
    replace(this.#editEventPoint, this.#eventPoint);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#eventPoint, this.#editEventPoint);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };
}

