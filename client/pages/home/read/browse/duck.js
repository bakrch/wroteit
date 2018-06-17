import { defineAction } from 'redux-define';
import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';



/* CONSTANTS */
export const BROWSE = defineAction('BROWSE', [REQUEST, SUCCESS, FAILURE]);



/* REDUCER */
const initialState = {
    loading: false,
    success: false,
    error: undefined,
    response: undefined
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case BROWSE.REQUEST:
            return {
                ...state,
                loading: true
            };
        case BROWSE.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: undefined,
                response: action.response
            };
        case BROWSE.FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const BrowseRequest = (fields) => ({ type: BROWSE.REQUEST, fields });
export const BrowseSuccess = (response) => ({ type: BROWSE.SUCCESS, response });
export const BrowseFailure = (error) => ({ type: BROWSE.FAILURE, error });



/* SAGA */
const browseSaga = function* ({ fields }) {

    try {
        const response = yield call(api.get, '/api/books', { query: fields });
        if (response.error) {
            yield put(BrowseFailure(response.message));
        }
        else {
            yield put(BrowseSuccess(response));
        }
    }
    catch (e) {
        yield put(BrowseFailure(e));
    }
};

const watcherSaga = function* () {

    yield takeLatest(BROWSE.REQUEST, browseSaga);
};


export const sagas = [watcherSaga];
