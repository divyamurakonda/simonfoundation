import { call, put, take, fork } from 'redux-saga/effects';
import Logger from 'js-logger';

import {
  shortCountryNamesLoaded,
  selectedItems
} from './actions';
import countryService from '../../services/CountryService';

const log = Logger.get('Country Saga');

export function* loadShortCountryNames() {
  const countries = yield countryService.getCountries();
  var min = Math.min(...countries.map(({ length }) => length));

  let shortCountries = [];
  countries.map(country => {
    if(country.length === min) {
      shortCountries.push(country);
    }
  });
  yield put(shortCountryNamesLoaded(shortCountries));
}

export function* watchForLoadShortCountryNames() {
  while(true) {
    yield take('LOAD_SHORT_COUNTRY_NAMES');
    yield call(loadShortCountryNames);
  }
}

export function* selectItem(params) {
  const response = yield call(countryService.getACountryPopulationAtGivenAge, params, 18, '2017');
  yield put(selectedItems(response));
}

export function* watchForSelectItem() {
  while(true) {
    const params = yield take('SELECT_ITEM');
    yield call(selectItem, params.payload);
  }
}

export function* countrySagas() {
  yield [
    fork(watchForLoadShortCountryNames),
    fork(watchForSelectItem),
  ];
}
