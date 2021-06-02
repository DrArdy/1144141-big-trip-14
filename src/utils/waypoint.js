import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const checkFutureWaypoint = (dateFrom) => {
  dayjs(dateFrom).isSameOrAfter(dayjs()) ? true : false;
};

const checkPastWaypoint = (dateTo) => {
  dayjs(dateTo).isBefore(dayjs()) ? true : false;
};

const checkOffersExistance = (offers) => {
  if (offers !== null) {
    return offers['offersInfo'].length !== 0;
  }
  else {
    return false;
  }
};

const sortWaypointByTime = (waypointA, waypointB) => {
  return dayjs(waypointB.dateTo).diff(dayjs(waypointB.dateFrom)) - dayjs(waypointA.dateTo).diff(dayjs(waypointA.dateFrom));
};

const sortWaypointByPrice = (waypointA, waypointB) => {
  return waypointB.basePrice - waypointA.basePrice ;
};

export {checkOffersExistance, checkFutureWaypoint, checkPastWaypoint, sortWaypointByPrice, sortWaypointByTime};
