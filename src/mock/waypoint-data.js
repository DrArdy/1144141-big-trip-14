import {MIN_BASE_PRICE, MAX_BASE_PRICE, WAYPOINT_OBJECTS_COUNT, MAX_START_HOUR, RANGE_OF_HOURS, RANGE_OF_DAYS, WAYPOINT_TYPES, WAYPOINT_DESTINATIONS, OFFERS_VARIANTS, OFFERS_PRICES, DESCRIPTION_VARIANTS, DESCRIPTION_COUNT, MAX_OFFERS_PACK_LENGTH, PHOTOS_COUNT} from '../constants.js';
import {getRandomInteger} from '../utils/common.js';

const getRandomValue = (dataArray) => {
  return dataArray[getRandomInteger(0, dataArray.length - 1)];
};

const getOffersPack = () => {
  const offersPack = new Array();
  const offersPackLength = getRandomInteger(0, MAX_OFFERS_PACK_LENGTH);

  if (offersPackLength !== 0) {
    const offersVariantsClone = OFFERS_VARIANTS.slice();

    for (let  i = 0; i < offersPackLength; i++) {
      const currentOffer = getRandomValue(offersVariantsClone);

      offersVariantsClone.splice(offersVariantsClone.indexOf(currentOffer), 1);

      const singleOffer = {
        title: currentOffer,
        price: OFFERS_PRICES[OFFERS_VARIANTS.indexOf(currentOffer)],
        checked: Boolean(getRandomInteger(0, 1)),
      };

      offersPack.push(singleOffer);
    }

    return offersPack;
  }
  else {
    return offersPack;
  }
};

const generateOffersMap = () => {
  const offersAndTypes = new Map();

  for (const currentType of WAYPOINT_TYPES) {
    offersAndTypes.set(currentType, getOffersPack());
  }

  return offersAndTypes;
};

const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, DESCRIPTION_COUNT);
  const descriptions = new Array();

  for (let i = 0; i < descriptionLength; i++) {
    descriptions.push(getRandomValue(DESCRIPTION_VARIANTS));
  }
  return descriptions.join(' ');
};

const generatePhoto = () => {
  const photosLength = getRandomInteger(1, PHOTOS_COUNT);
  const photos = new Array();

  for (let i = 0; i < photosLength; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`);
  }

  return photos;
};

const generateRandomDate = (rangeOfDays,startHour,hourRange) => {
  const today = new Date(Date.now());
  return new Date(today.getYear()+1900,today.getMonth(), today.getDate()+Math.random() *rangeOfDays, Math.random()*hourRange + startHour, Math.random()*60);
};

const generateDatesMap = () => {
  const datesMap = new Map();
  let startHourFrom = 0;
  let startHourTo = startHourFrom + MAX_START_HOUR;

  for (let i = 0; i < WAYPOINT_OBJECTS_COUNT; i++) {
    const dateFrom = generateRandomDate(RANGE_OF_DAYS, startHourFrom, RANGE_OF_HOURS);
    const dateTo = generateRandomDate(RANGE_OF_DAYS, startHourTo, RANGE_OF_HOURS);

    datesMap.set(dateFrom, dateTo);
    startHourFrom = startHourFrom + MAX_START_HOUR + RANGE_OF_HOURS;
    startHourTo = startHourTo + MAX_START_HOUR + RANGE_OF_HOURS;
  }

  return datesMap;
};

const generateWaypointData = (generatedDateFrom, generatedDateTo) => {
  const offersMap = generateOffersMap();
  const currentType = getRandomValue(WAYPOINT_TYPES);

  return {
    type: currentType,
    city: getRandomValue(WAYPOINT_DESTINATIONS),
    offers: {
      waypointType: currentType,
      offersInfo: offersMap.get(currentType),
    },
    info: {
      description: generateDescription(),
      photos: generatePhoto(),
    },
    dateFrom: generatedDateFrom,
    dateTo: generatedDateTo,
    isFavourite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
  };
};

const generateWaypointDataArray = () => {
  const waypointArray = new Array();
  const datesMap = generateDatesMap();
  const datesFrom = Array.from(datesMap.keys());
  const datesTo = Array.from(datesMap.values());

  for (let i = 0; i < WAYPOINT_OBJECTS_COUNT; i++) {
    waypointArray.push(generateWaypointData(datesFrom[i], datesTo[i]));
  }

  return waypointArray;
};

export {generateWaypointDataArray, generateDatesMap};
