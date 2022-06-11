import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {placesReducer} from './reducers/placesReducer';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  places: placesReducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
