import {ADD, REMOVE} from '../actions/placesActions';

const initState = {
  placesList: [],
};

export const placesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      return {...state, placesList: [action.placeData, ...state.placesList]};
    case REMOVE:
      return {
        ...state,
        placesList: state.placesList.filter(place => {
          return place.id != action.id;
        }),
      };

    default:
      return state;
  }
};
