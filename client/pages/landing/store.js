/* global window */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
// import reduxPromiseMiddleware from 'redux-promise-middleware';
// import reduxMulti from 'redux-multi';
// Logger?
import { routerMiddleware as RouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();


const routerMiddleware = RouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
import reducers from './reducers';
import sagas from './sagas';

// Redux DevTools Extension.
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware
        )
    )
);
store.close = () => store.dispatch(END);

sagaMiddleware.run(sagas);

export default store;
