import { combineReducers } from 'redux-immutable';
import PopulationReducer from './Population/reducers';
import CountryReducer from './Country/reducers';
import RankingReducer from './Ranking/reducers';

const reducers = combineReducers({
  population: PopulationReducer,
  country: CountryReducer,
  ranking: RankingReducer
});

export default reducers;
