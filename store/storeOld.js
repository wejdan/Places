import {placesReducer} from './reducers/placesReducer';

import {combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createStore} from 'redux';

export const store = createStore(
  combineReducers({
    places: placesReducer,
  }),
  applyMiddleware(thunk),
);
