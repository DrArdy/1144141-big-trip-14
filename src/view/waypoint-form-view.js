import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {WAYPOINT_TYPES, BLANK_WAYPOINT, WAYPOINT_DESTINATIONS} from '../constants.js';
import {checkOffersExistance} from '../utils/waypoint.js';
import {SmartView} from './smart-view.js';
import {offersMap} from '../mock/waypoint-data.js';

dayjs.extend(customParseFormat);

const createWaypointFormTemplate = (waypointData) => {
  const {type, city, offers, info, dateFrom, dateTo, basePrice} = waypointData;

  const renderCities = () => {

    const cities = new Array();

    for (const cityVariant of WAYPOINT_DESTINATIONS) {
      cities.push(`<option value="${cityVariant}"}></option>`);
    }

    return cities.join('');
  };

  const renderEventTypes = (currentType) => {

    const eventTypes = new Array();

    for (const typeVariant of WAYPOINT_TYPES) {
      eventTypes.push(`<div class="event__type-item">
      <input id="event-type-${typeVariant}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeVariant}" ${currentType === typeVariant ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeVariant}" for="event-type-${typeVariant}-1">${typeVariant[0].toUpperCase() + typeVariant.slice(1, typeVariant.length + 1)}</label>
      </div>`);
    }

    return eventTypes.join('');
  };

  const renderOffersList = (currentType) => {
    const offersList = new Array();
    const currentOffers = offersMap.get(currentType);
    for (const offer of currentOffers) {
      const offerIdentificator = offer.title.split(' ').join('-');

      offersList.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offerIdentificator}" type="checkbox" name="${offerIdentificator}" ${offer.checked ? 'checked' : ''}>
      <label class="event__offer-label" for="${offerIdentificator}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`);
    }

    return offersList.join('');
  };

  const renderPhotos = () => {
    const photosList = new Array();

    for (const photo of info['photos']) {
      photosList.push(`<img class="event__photo" src=${photo} alt="Event photo">`);
    }
    return photosList.join('');
  };

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${renderEventTypes(type)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city !== '' ? city : ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${renderCities()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom !== '' ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : `${dayjs().format('DD/MM/YY')} 00:00`}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo !== '' ? dayjs(dateTo).format('DD/MM/YY HH:mm') : `${dayjs().format('DD/MM/YY')} 00:00`}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice !== '' ? basePrice : ''}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${city !== '' ? '<button class="event__reset-btn" type="reset">Delete</button> <button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span> </button>' : ' <button class="event__reset-btn" type="reset">Cancel</button>'}
  </header>
  <section class="event__details">

    ${checkOffersExistance(offers) ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${renderOffersList(type)}
    </div>
    </section>` : '' }

    ${city !== '' ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${info.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${renderPhotos()}
      </div>
    </div>
    </section>` : ''}

  </section>
  </form>`;
};

class WaypointFormView extends SmartView{
  constructor(waypoint = BLANK_WAYPOINT) {
    super();

    this._waypointData = WaypointFormView.parseWaypointToWaypointData(waypoint);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityClearHandler = this._cityClearHandler.bind(this);
    this._priceInputHandler =  this._priceInputHandler.bind(this);
    this._dateFromInputHandler = this._dateFromInputHandler.bind(this);
    this._dateToInputHandler = this._dateToInputHandler.bind(this);
    /* this._offersCheckHandler = this._offersCheckHandler.bind(this); */

    this._setInnerHandlers();
  }

  reset(waypoint) {
    this.updateData(
      WaypointFormView.parseWaypointToWaypointData(waypoint),
    );
  }

  getTemplate() {
    return createWaypointFormTemplate(this._waypointData);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.formDelete);
    this.setFormCloseHandler(this._callback.formClose);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityInputHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('focus', this._cityClearHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);
    this.getElement()
      .querySelector('#event-start-time-1')
      .addEventListener('focus', this._dateFromInputHandler);
    this.getElement()
      .querySelector('#event-end-time-1')
      .addEventListener('focus', this._dateToInputHandler);
    /* if (checkOffersExistance(this._waypointData.offers)) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._offersCheckHandler);
    } */
  }

  /*  _offersCheckHandler(evt) {
    this.updateData({
      offers: Object.assign(
        {},
        this._waypointData.offers,
        {
          offersInfo: ,
        },
      ),
    });
  } */

  _dateFromInputHandler(evt) {
    evt.preventDefault();

    flatpickr('#event-start-time-1', {
      enableTime: true,
      time_24hr: true,
      dateFormat: 'd/m/y H:i',
      maxDate: this.getElement().querySelector('#event-end-time-1').value,
      onValueUpdate: () => {
        this.updateData({
          dateFrom: dayjs(evt.target.value, 'DD/MM/YY HH:mm').toISOString(),
        }, true);
      },
    });
  }

  _dateToInputHandler(evt) {
    evt.preventDefault();

    flatpickr('#event-end-time-1', {
      enableTime: true,
      time_24hr: true,
      dateFormat: 'd/m/y H:i',
      minDate: this.getElement().querySelector('#event-start-time-1').value,
      onValueUpdate: () => {
        this.updateData({
          dateTo: dayjs(evt.target.value, 'DD/MM/YY HH:mm').toISOString(),
        }, true);
      },
    });
  }

  _priceInputHandler(evt) {
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _cityInputHandler(evt) {
    this.updateData({
      city: evt.target.value,
    }, true); //update description and photos from server
  }

  _cityClearHandler(evt) {
    evt.preventDefault();
    evt.target.value = '';
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
    });
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formClose();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(WaypointFormView.parseWaypointDataToWaypoint(this._waypointData));
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.formDelete();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  setFormDeleteHandler(callback) {
    this._callback.formDelete = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler);
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
  }

  static parseWaypointToWaypointData(waypoint) {
    return Object.assign(
      {},
      waypoint,
      {
      },
    );
  }

  static parseWaypointDataToWaypoint(waypointData) {
    waypointData = Object.assign({}, waypointData);

    return waypointData;
  }
}

export {WaypointFormView};
