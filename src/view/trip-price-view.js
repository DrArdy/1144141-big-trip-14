import {createElement} from '../utils.js';

const createTripPriceTemplate = (waypointDataArray) => {
  if (waypointDataArray.length > 0) {
    const countTotalPrice = () => {
      let totalPrice = 0;

      for (const waypointData of waypointDataArray) {
        const offers = waypointData.offers['offersInfo'];

        totalPrice = totalPrice + waypointData.basePrice;

        for (const offer of offers) {
          if (offer.checked) {
            totalPrice = totalPrice + offer.price;
          }
          else {
            continue;
          }
        }
      }
      return totalPrice;
    };

    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTotalPrice()}</span>
    </p>`;
  } else {
    return '';
  }
};

class TripPriceView {
  constructor(waypointDataArray) {
    this._waypointArray = waypointDataArray;

    this._element = null;
  }

  getTemplate() {
    return createTripPriceTemplate(this._waypointArray);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {TripPriceView};
