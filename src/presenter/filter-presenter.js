import {FiltersView} from '../view/filters-view.js';
import {render, RenderPosition} from '../utils/render.js';
import {FilterType, UpdateType} from '../constants.js';

class FilterPresenter {
  constructor(filterContainer, filterModel, waypointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._waypointsModel = waypointsModel;

    this._filterComponent = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._waypointsModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);
  }

  init() {
    const filters = this._getFilters();

    this._filterComponent = new FiltersView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _modelEventHandler() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
      {
        type: FilterType.PAST,
        name: 'Past',
      },
    ];
  }
}

export {FilterPresenter};
