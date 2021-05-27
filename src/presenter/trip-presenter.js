import {TripInfoView} from '../view/trip-info-view.js';
import {TripPriceView} from '../view/trip-price-view.js';
import {MenuView} from '../view/menu-view.js';
import {FiltersView} from '../view/filters-view.js';
import {SortingView} from '../view/sorting-view.js';
import {ListView} from '../view/list-view.js';
import {EmptyListView} from '../view/empty-list-view.js';
import {WAYPOINT_OBJECTS_COUNT} from '../constants.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {WaypointPresenter} from './waypoint-presenter.js';

class TripPresenter {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._waypointPresenter = {};

    this._menuComponent = new MenuView();
    this._sortingComponent = new SortingView();
    this._filtersComponent = new FiltersView();
    this._listComponent = new ListView();
    this._emptyListComponent = new EmptyListView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripWaypoints) {
    this._tripWaypoints = tripWaypoints.slice();

    this._infoComponent = new TripInfoView(this._tripWaypoints);
    this._priceComponent = new TripPriceView(this._tripWaypoints);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleWaypointChange(updatedWaypoint) {
    this._tripWaypoints = updateItem(this._tripWaypoints, updatedWaypoint);
    this._waypointPresenter[updatedWaypoint.id].init(updatedWaypoint);
  }

  _renderInfo() {
    const tripInfoContainer = document.querySelector('.trip-main');

    render(tripInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPrice() {
    render(this._infoComponent, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    const tripMenuContainer = document.querySelector('.trip-controls__navigation');

    render(tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    const tripFiltersContainer = document.querySelector('.trip-controls__filters');

    render(tripFiltersContainer, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._tripContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _replaceEmptyList() {
    replace(this._listComponent, this._emptyListComponent);
  }

  _clearWaypointsList() {
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._listComponent, this._handleWaypointChange, this._handleModeChange);

    waypointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = waypointPresenter;
  }

  _renderWaypointsList() {
    this._renderEmptyList();

    for (let i = 0; i < WAYPOINT_OBJECTS_COUNT; i++) {
      if (i === 1) {
        this._replaceEmptyList();
      }
      this._renderWaypoint(this._tripWaypoints[i]);
    }
  }

  _renderTrip() {
    this._renderInfo();
    this._renderPrice();

    this._renderMenu();
    this._renderFilters();
    this._renderSorting();

    this._renderWaypointsList();
  }
}

export {TripPresenter};
