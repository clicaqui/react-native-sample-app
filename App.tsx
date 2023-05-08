import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import PlaceNavigator from './navigator/PlaceNavigator';
import placeReducers from './store/place-reducers';
import { init } from './helpers/db';

init().then(() => {
    console.log('Initializing ok');
}).catch((err:any) => {
  console.log('Initializing err');
  console.log(err);
});
const rootReducer = combineReducers({
  places: placeReducers
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
