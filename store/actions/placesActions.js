export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const LOAD = 'LOAD';

export const addPlace = placeData => {
  return {
    type: ADD,
    placeData,
  };
};
export const removePlace = id => {
  return {
    type: REMOVE,
    id,
  };
};
