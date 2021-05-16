const createTripPrice = (waypointDataArray) => {

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
};

export {createTripPrice};
