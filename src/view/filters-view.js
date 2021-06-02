import {AbstractView} from './abstract-view.js';
import {FilterType} from '../constants.js';

const createFiltersTemplate = (currentFilterType) => {
  const createFilterItemTemplate = (filter, currentFilterType) => {
    const {type, name} = filter;
    return `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`;
  };
  console.log();
  const filterItemsTemplate = () => {
    return FilterType.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
  };
  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

${type === currentFilterType ? 'checked' : ''

class FiltersView extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

export {FiltersView};
