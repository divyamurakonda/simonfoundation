import { call, put, take, fork } from 'redux-saga/effects';

import {
  usaPopulationLoaded,
  worldPopulationLoaded,
} from './actions';
import populationService from '../../services/PopulationService';

const log = Logger.get('Population Saga');

export function* loadUSAPopulation() {
  const usaPopulation = yield populationService.getUSAPopulation();
  yield put(usaPopulationLoaded(usaPopulation));
}

export function* watchForLoadUSAPopulation() {
  while(true) {
    yield take('LOAD_USA_POPULATION');
    yield call(loadUSAPopulation);
  }
}

export function* loadWorldPopulation() {
  const worldPopulation = yield populationService.getWorldPopulation();
  log.info('world population', worldPopulation);
  yield put(worldPopulationLoaded(worldPopulation));
}

export function* watchForLoadWorldPopulation() {
  while(true) {
    yield take('LOAD_WORLD_POPULATION');
    yield call(loadWorldPopulation);
  }
}

export function* populationSagas() {
  yield [
    fork(watchForLoadUSAPopulation),
    fork(watchForLoadWorldPopulation),
  ];
}
