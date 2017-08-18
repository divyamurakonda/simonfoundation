import { createAction } from 'redux-actions';

export const loadRanking = createAction('LOAD_RANKING');
export const rankingLoaded = createAction('RANKING_LOADED');
export const clearRanking = createAction('CLEAR_RANKING');
