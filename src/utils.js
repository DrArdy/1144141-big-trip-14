import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const checkFutureWaypoint = (waypointData) => {
  dayjs(waypointData.dateFrom).isSameOrAfter(dayjs()) ? 'true' : 'false';
};

const checkPastWaypoint = (waypointData) => {
  dayjs(waypointData.dateTo).isBefore(dayjs()) ? 'true' : 'false';
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  if (element !== null && container !== null) {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
    }
  } else {
    return;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const checkOffersExistance = (offers) => {
  if (offers !== null) {
    return offers['offersInfo'].length !== 0;
  }
  else {
    return false;
  }
};

export {checkOffersExistance, RenderPosition, render, createElement, getRandomInteger, checkFutureWaypoint, checkPastWaypoint};
