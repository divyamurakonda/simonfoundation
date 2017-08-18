import { createAction } from 'redux-actions';

export const loadUSAPopulation = createAction('LOAD_USA_POPULATION');
export const usaPopulationLoaded = createAction('USA_POPULATION_LOADED');
export const loadWorldPopulation = createAction('LOAD_WORLD_POPULATION');
export const worldPopulationLoaded = createAction('WORLD_POPULATION_LOADED');
