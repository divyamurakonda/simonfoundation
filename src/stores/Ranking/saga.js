import { call, put, take, fork } from 'redux-saga/effects';
import Logger from 'js-logger';

import {
  rankingLoaded,
} from './actions';
import rankingService from '../../services/RankingService';

export function* loadRanking(params) {
  const response = yield call(rankingService.getRanking, params);
  yield put(rankingLoaded(response));
}

export function* watchForLoadRanking() {
  while(true) {
    const params = yield take('LOAD_RANKING');
    yield call(loadRanking, params.payload);
  }
}

export function* rankingSagas() {
  yield [
    fork(watchForLoadRanking),
  ];
}
