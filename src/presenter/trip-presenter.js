import {TripInfoView} from '../view/trip-info-view.js';
import {TripPriceView} from '../view/trip-price-view.js';
import {MenuView} from '../view/menu-view.js';
import {FiltersView} from '../view/filters-view.js';
import {SortingView} from '../view/sorting-view.js';
import {ListView} from '../view/list-view.js';
import {EmptyListView} from '../view/empty-list-view.js';
import {FilterType, SortingType, UpdateType, UserAction} from '../constants.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {sortWaypointByTime, sortWaypointByPrice} from '../utils/waypoint.js';
import {filter} from '../utils/filter.js';
import {WaypointPresenter} from './waypoint-presenter.js';
import {WaypointNewPresenter} from './waypoint-new-presenter.js';

class TripPresenter {
  constructor(tripContainer, waypointsModel, filterModel) {
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._waypointPresenter = {};
    this._currentSortingType = SortingType.DEFAULT;

    this._sortingComponent = null;

    this._menuComponent = new MenuView();
    this._filtersComponent = new FiltersView(this._filterModel.getFilter());
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();

    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortingTypeChangeHandler = this._sortingTypeChangeHandler.bind(this);

    this._waypointsModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

    this._waypointNewPresenter = new WaypointNewPresenter(this._listComponent, this._viewActionHandler);
  }

  init() {
    this._renderMenu();

    this._renderTrip();
  }

  createWaypoint() {
    this._currentSortType = SortingType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._waypointNewPresenter.init();
  }

  _sortingTypeChangeHandler(sortingType) {
    if (this._currentSortingType === sortingType) {
      return;
    }

    this._currentSortingType = sortingType;

    this._clearTrip();
    this._renderTrip();
  }

  _modeChangeHandler() {
    this._waypointNewPresenter.destroy();
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _getWaypoints() {
    const currentFilterType = this._filterModel.getFilter();
    const oldWaypoints = this._waypointsModel.getWaypoints();
    const waypoints = this._waypointsModel.getWaypoints().slice();

    if (this._currentSortingType === SortingType.DEFAULT) {
      switch (currentFilterType) {
        case FilterType.EVERYTHING:
          return oldWaypoints;
        case FilterType.FUTURE:
          return filter[currentFilterType](waypoints);
        case FilterType.PAST:
          return filter[currentFilterType](waypoints);
      }
    } else {
      this._filterModel.resetFilter();
      switch (this._currentSortingType) {
        case SortingType.DEFAULT:
          return oldWaypoints;
        case SortingType.TIME:
          return waypoints.sort(sortWaypointByTime);
        case SortingType.PRICE:
          return waypoints.sort(sortWaypointByPrice);
      }
    }

    return waypoints;
  }

  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this._waypointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this._waypointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this._waypointsModel.deleteWaypoint(updateType, update);
        break;
    }
  }

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortingType: true});
        this._renderTrip();
        break;
    }
  }

  _renderInfo() {
    const tripInfoContainer = document.querySelector('.trip-main');
    this._infoComponent = new TripInfoView(this._getWaypoints());

    render(tripInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPrice() {
    this._priceComponent = new TripPriceView(this._getWaypoints());

    render(this._infoComponent, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    const tripMenuContainer = document.querySelector('.trip-controls__navigation');

    render(tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortingType);

    this._sortingComponent.setSortingTypeChangeHandler(this._sortingTypeChangeHandler);

    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _replaceEmptyList() {
    replace(this._listComponent, this._emptyListComponent);
  }

  _clearTrip({resetSortingType = false} = {}) {
    this._waypointNewPresenter.destroy();
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};

    remove(this._filtersComponent);
    remove(this._sortingComponent);
    remove(this._emptyListComponent);
    remove(this._infoComponent);
    remove(this._priceComponent);

    if (resetSortingType) {
      this._currentSortingType = SortingType.DEFAULT;
    }
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._listComponent, this._viewActionHandler, this._modeChangeHandler);

    waypointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = waypointPresenter;
  }

  _renderTrip() {
    const waypoints = this._getWaypoints();
    const waypointCount = waypoints.length;

    this._renderSorting();

    if (waypointCount === 0) {
      this._renderEmptyList;
      return;
    }

    this._renderInfo();
    this._renderPrice();

    this._renderEmptyList();

    if (this._getWaypoints().length > 0) {
      this._replaceEmptyList();
      for (const waypoint of this._getWaypoints()) {
        this._renderWaypoint(waypoint);
      }
    }
  }
}

export {TripPresenter};
