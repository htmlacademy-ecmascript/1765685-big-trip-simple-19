import AbstractView from '../framework/view/abstract-view.js';

function createFilterEventsTemplate(filters) {
  const templateFilters = filters
    .map(
      (filter, index) =>
        `<div class="trip-filters__filter">
  <input id="filter-${
  filter.name
}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${
  filter.name
}"
  ${filter.isCount ? '' : 'disabled'} ${index === 0 ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter.name}">${
  filter.name
}</label>
</div>`
    )
    .join('');

  return `<form class="trip-filters" action="#" method="get">
  ${templateFilters}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class FilterEventsView extends AbstractView {
  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterEventsTemplate(this.filters);
  }
}
