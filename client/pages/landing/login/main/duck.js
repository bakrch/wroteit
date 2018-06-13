/* global window */
import { defineAction } from 'redux-define';
import { call, takeLatest } from 'redux-saga/effects';
import Qs from 'qs';
// import { SubmissionError } from 'redux-form';
import { FORM, SUBMIT, REQUEST } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';



/* CONSTANTS */
export const LOGIN = defineAction('LOGIN', [FORM, SUBMIT, REQUEST]);



/* REDUCER */
const initialState = {
    // loading: false,
    // success: false,
    // error: undefined,
    // response: undefined
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        // case LOGIN.REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case LOGIN.SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: true,
        //         response: action.response
        //     };
        // case LOGIN.FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     };
        default:
            return state;
    }
}



/* ACTION CREATORS */
// export const LoginRequest = (data) => ({ type: LOGIN.REQUEST, data });
// export const LoginSuccess = (response) =>  ({ type: LOGIN.SUCCESS, response });
// export const LoginFailure = (error) =>  ({ type: LOGIN.FAILURE, error });
export const SubmitLoginForm = (fields) => ({ type: LOGIN.SUBMIT, fields });



/* SAGA */
const loginSaga = function* (data) {

    // try {
    const response = yield call(api.post, '/api/login', { body: data });
    if (response.error) {
        // yield put(LoginFailure(response.message));
        throw new Error(response.message);
    }

    const query = Qs.parse(window.location.search.substring(1));

    if (query.returnTo) {
        window.location.href = query.returnTo;
    }
    else {
        window.location.href = '/';
    }
    // else {
    //     yield put(LoginSuccess(response));
    // }
    // }
    // catch (e) {
    //     yield put(LoginFailure(e));
    //     throw e;
    // }
};


const submitLoginFormSaga = function* (data) {

    yield call(FormSaga, LOGIN.FORM, loginSaga, data.fields);
};

const watcherSaga = function* () {

    yield [
        takeLatest(LOGIN.REQUEST, loginSaga),
        takeLatest(LOGIN.SUBMIT, submitLoginFormSaga)
    ];
};


export const sagas = [watcherSaga];
