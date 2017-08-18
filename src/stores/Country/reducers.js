import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import Logger from 'js-logger';

const log = Logger.get('Reducer');

const initialState = Immutable.Map({
  shortCountryNames: [],
  selectedItems: [],
});

const reducers = handleActions(
  {
    SHORT_COUNTRY_NAMES_LOADED: (state, action) => {
      return state.set('shortCountryNames', action.payload);
    },
    SELECTED_ITEMS: (state, action) => {
      const data = [];
      let oldSelectedItems = state.get('selectedItems')
      oldSelectedItems.length !== 0 &&
      oldSelectedItems.forEach(item => {
        data.push(item)
      });
      data.push(action.payload);
      return state.set('selectedItems', data);
    }
  },
  initialState
);

export default reducers;
