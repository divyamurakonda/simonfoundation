import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  rank: 0,
});

const reducers = handleActions(
  {
    RANKING_LOADED: (state, action) => {
      return state.set('rank', action.payload);
    },
    CLEAR_RANKING: (state, action) => {
      return state.set('rank', 0);
    }
  },
  initialState
);

export default reducers;
