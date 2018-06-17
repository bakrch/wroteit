import { defineAction } from 'redux-define';
import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';



/* CONSTANTS */
export const MYBOOKS = defineAction('MYBOOKS', [REQUEST, SUCCESS, FAILURE]);



/* REDUCER */
const initialState = {
    loading: false,
    success: false,
    error: undefined,
    data: []
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case MYBOOKS.REQUEST:
            return {
                ...state,
                loading: true
            };
        case MYBOOKS.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: undefined,
                data: action.response
            };
        case MYBOOKS.FAILURE:
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
export const MybooksRequest = () => ({ type: MYBOOKS.REQUEST });
export const MybooksSuccess = (response) => ({ type: MYBOOKS.SUCCESS, response });
export const MybooksFailure = (error) => ({ type: MYBOOKS.FAILURE, error });



/* SAGA */
const mybooksSaga = function* () {

    try {
        const response = yield call(api.get, '/api/books/me');
        if (response.error) {
            yield put(MybooksFailure(response.message));
        }
        else {
            yield put(MybooksSuccess(response));
        }
    }
    catch (e) {
        yield put(MybooksFailure(e));
    }
};

const watcherSaga = function* () {

    yield takeLatest(MYBOOKS.REQUEST, mybooksSaga);
};


export const sagas = [watcherSaga];
