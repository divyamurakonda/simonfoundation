import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import Logger from 'js-logger';

const log = Logger.get('Reducer');

const initialState = Immutable.Map({
  usaPopulation: 0,
  worldPopulation: [],
});

const reducers = handleActions(
  {
    USA_POPULATION_LOADED: (state, action) => {
      log.info('USA Population Loaded');
      return state.set('usaPopulation', action.payload);
    },
    WORLD_POPULATION_LOADED: (state, action) => {
      log.info('World Population Loaded');
      return state.set('worldPopulation', action.payload);
    },
  },
  initialState
);

export default reducers;
