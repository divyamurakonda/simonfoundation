import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import { populationSagas } from '../Population/saga';
import { countrySagas } from '../Country/saga';
import { rankingSagas } from '../Ranking/saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState) {
  let initState = initialState;
  if (initState == null) {
    initState = Immutable.Map();
  } else {
    initState = Immutable.Map(initialState);
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancer(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer, initState, enhancer);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    const reducerDefault = require('../reducers').default;
    module.hot.accept('../reducers', () => store.replaceReducer(reducerDefault));
  }

  function* rootSaga() {
    yield [
      populationSagas(),
      countrySagas(),
      rankingSagas()
    ];
  }

  sagaMiddleware.run(rootSaga);

  return store;
}

export default { configureStore };
