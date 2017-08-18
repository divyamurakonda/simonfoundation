import { createAction } from 'redux-actions';

export const loadShortCountryNames = createAction('LOAD_SHORT_COUNTRY_NAMES');
export const shortCountryNamesLoaded = createAction('SHORT_COUNTRY_NAMES_LOADED');
export const selectItem = createAction('SELECT_ITEM');
export const selectedItems = createAction('SELECTED_ITEMS');
