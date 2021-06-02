import {WaypointFormView} from '../view/waypoint-form-view.js';
import {WaypointView} from '../view/waypoint-view.js';
import {replace, render, RenderPosition, remove} from '../utils/render.js';
import {checkFutureWaypoint, checkPastWaypoint} from '../utils/waypoint.js';
import {UserAction, UpdateType} from '../constants.js';

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

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointFormComponent = this._waypointFormComponent;

    this._waypointComponent = new WaypointView(this._waypoint);
    this._waypointFormComponent = new WaypointFormView(this._waypoint);

    this._waypointComponent.setEditClickHandler(this._editClickHandler);
    this._waypointComponent.setFavouriteClickHandler(this._favouriteClickHandler);
    this._waypointFormComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._waypointFormComponent.setFormDeleteHandler(this._formDeleteHandler);
    this._waypointFormComponent.setFormCloseHandler(this._formCloseHandler);

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
      document.removeEventListener('keydown', this._escKeydownHandler);
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

  _escKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._waypointFormComponent.reset(this._waypoint);
      this._replaceFormToWaypoint();
      document.removeEventListener('keydown', this._escKeydownHandler);
    }
  }

  _editClickHandler() {
    this._replaceWaypointToForm();
    document.addEventListener('keydown', this._escKeydownHandler);
  }

  _formSubmitHandler(update) {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate =
      checkFutureWaypoint(this._waypoint.dateFrom) !== checkFutureWaypoint(update.dateFrom) ||
      checkPastWaypoint(this._waypoint.dateTo) !== checkPastWaypoint(update.dateTo);
    this._changeData(UserAction.UPDATE_WAYPOINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this._replaceFormToWaypoint();
    document.removeEventListener('keydown', this._escKeydownHandler);
  }

  _formDeleteHandler(waypoint) {
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      waypoint,
    );
    document.removeEventListener('keydown', this._escKeydownHandler);
  }

  _formCloseHandler() {
    this._waypointFormComponent.reset(this._waypoint);
    this._replaceFormToWaypoint();
    document.removeEventListener('keydown', this._escKeydownHandler);
  }

  _favouriteClickHandler() {
    const favouriteButton = this._waypointComponent.getElement().querySelector('.event__favorite-btn');

    favouriteButton.classList.toggle('event__favorite-btn--active');

    this._changeData(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.MINOR,
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
