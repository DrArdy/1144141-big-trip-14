import {WaypointFormView} from '../view/waypoint-form-view.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../constants.js';

class WaypointNewPresenter {
  constructor(waypointListContainer, changeData) {
    this._waypointListContainer = waypointListContainer;
    this._changeData = changeData;

    this._waypointFormComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._waypointFormComponent !== null) {
      return;
    }

    this._waypointFormComponent = new WaypointFormView();
    this._waypointFormComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._waypointFormComponent.setFormDeleteHandler(this._formDeleteHandler);

    render(this._waypointListContainer, this._waypointFormComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._waypointFormComponent === null) {
      return;
    }

    remove(this._waypointFormComponent);
    this._waypointFormComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _formSubmitHandler(waypoint) {
    this._changeData(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, waypoint),
    );
    this.destroy();
  }

  _formDeleteHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

export {WaypointNewPresenter};
