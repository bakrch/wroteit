import { defineAction } from 'redux-define';
import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';



/* CONSTANTS */
export const LOGOUT = defineAction('LOGOUT', [REQUEST, SUCCESS, FAILURE]);



/* REDUCER */
const initialState = {
    loading: false,
    success: false,
    error: undefined,
    response: undefined
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case LOGOUT.REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGOUT.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: undefined,
                response: action.response
            };
        case LOGOUT.FAILURE:
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
export const LogoutRequest = () => ({ type: LOGOUT.REQUEST });
export const LogoutSuccess = (response) => ({ type: LOGOUT.SUCCESS, response });
export const LogoutFailure = (error) => ({ type: LOGOUT.FAILURE, error });



/* SAGA */
const logoutSaga = function* (data) {

    try {
        const response = yield call(api.delete, '/api/logout');
        if (response.error) {
            yield put(LogoutFailure(response.message));
        }
        else {
            yield put(LogoutSuccess(response));
            yield put(push('/'));
        }
    }
    catch (e) {
        yield put(LogoutFailure(e));
    }
};

const watcherSaga = function* () {

    yield takeLatest(LOGOUT.REQUEST, logoutSaga);
};


export const sagas = [watcherSaga];
