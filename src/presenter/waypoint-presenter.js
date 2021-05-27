import {WaypointFormView} from '../view/waypoint-form-view.js';
import {WaypointView} from '../view/waypoint-view.js';
import {replace, render, RenderPosition, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class WaypointPresenter {
  constructor(listComponent, changeData, changeMode) {
    this._listComponent = listComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._waypointComponent = null;
    this._waypointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDelete = this._handleFormDelete.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleEscKeydown = this._handleEscKeydown.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointFormComponent = this._waypointFormComponent;

    this._waypointComponent = new WaypointView(this._waypoint);
    this._waypointFormComponent = new WaypointFormView(this._waypoint);

    this._waypointComponent.setEditClickHandler(this._handleEditClick);
    this._waypointComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._waypointFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointFormComponent.setFormDeleteHandler(this._handleFormDelete);
    this._waypointFormComponent.setFormCloseHandler(this._handleFormClose);

    if (prevWaypointComponent === null || prevWaypointFormComponent === null) {
      render(this._listComponent, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointFormComponent, prevWaypointFormComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointFormComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      document.removeEventListener('keydown', this._handleEscKeydown);
      this._replaceFormToWaypoint();
    }
  }

  _replaceWaypointToForm() {
    replace(this._waypointFormComponent, this._waypointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToWaypoint() {
    replace(this._waypointComponent, this._waypointFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToWaypoint();
      document.removeEventListener('keydown', this._handleEscKeydown);
    }
  }

  _handleEditClick() {
    this._replaceWaypointToForm();
    document.addEventListener('keydown', this._handleEscKeydown);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(waypoint);
    this._replaceFormToWaypoint();
    document.removeEventListener('keydown', this._handleEscKeydown);
  }

  _handleFormDelete() {
    this._replaceFormToWaypoint();
    document.removeEventListener('keydown', this._handleEscKeydown);
  }

  _handleFormClose() {
    this._replaceFormToWaypoint();
    document.removeEventListener('keydown', this._handleEscKeydown);
  }

  _handleFavouriteClick() {
    const favouriteButton = this._waypointComponent.getElement().querySelector('.event__favorite-btn');

    favouriteButton.classList.toggle('event__favorite-btn--active');

    this._changeData(
      Object.assign(
        {},
        this._waypoint,
        {
          isFavourite: !this._waypoint.isFavourite,
        },
      ),
    );
  }
}

export {WaypointPresenter};
