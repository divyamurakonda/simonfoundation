import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  usaPopulation: 0,
  worldPopulation: [],
});

const reducers = handleActions(
  {
    USA_POPULATION_LOADED: (state, action) => {
      return state.set('usaPopulation', action.payload);
    },
    WORLD_POPULATION_LOADED: (state, action) => {
      return state.set('worldPopulation', action.payload);
    },
  },
  initialState
);

export default reducers;
