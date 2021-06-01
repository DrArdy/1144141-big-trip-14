import {AbstractView} from './abstract-view';

class SmartView extends AbstractView {
  constructor() {
    super();
    this._waypointData = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._waypointData = Object.assign(
      {},
      this._waypointData,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}

export {SmartView};
