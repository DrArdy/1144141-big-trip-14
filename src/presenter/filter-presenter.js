import {FiltersView} from '../view/filters-view.js';
import {render, RenderPosition} from '../utils/render.js';
import {UpdateType} from '../constants.js';

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
    if (this._filterComponent !== null) {
      return;
    }

    this._filterComponent = new FiltersView(this._filterModel.getFilter());
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
}

export {FilterPresenter};
