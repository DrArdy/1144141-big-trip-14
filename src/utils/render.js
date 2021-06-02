import {AbstractView} from '../view/abstract-view.js';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (child !== null && container !== null) {

    if (container instanceof AbstractView) {
      container = container.getElement();
    }

    if (child instanceof AbstractView) {
      child = child.getElement();
    }

    const Handler = {
      [RenderPosition.BEFOREEND]: () => {
        container.append(child);
      },
      [RenderPosition.AFTERBEGIN]: () => {
        container.prepend(child);
      },
    };

    const handle = Handler[place] || Handler[RenderPosition.BEFOREEND];

    handle();

  } else {
    return;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export {render, createElement, replace, remove, RenderPosition};
