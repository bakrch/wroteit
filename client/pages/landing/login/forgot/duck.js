import { defineAction } from 'redux-define';
import { call, takeLatest } from 'redux-saga/effects';
import { FORM, SUBMIT, REQUEST } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';



/* CONSTANTS */
export const FORGOT = defineAction('FORGOT', [FORM, SUBMIT, REQUEST]);



/* REDUCER */
const initialState = {};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const SubmitForgotForm = (fields) => ({ type: FORGOT.SUBMIT, fields });



/* SAGA */
const forgotSaga = function* (data) {

    const response = yield call(api.post, '/api/login/forgot', { body: data });
    if (response.error) {
        throw new Error(response.message);
    }
};


const submitForgotFormSaga = function* (data) {

    yield call(FormSaga, FORGOT.FORM, forgotSaga, data.fields);
};

const watcherSaga = function* () {

    yield [
        takeLatest(FORGOT.REQUEST, forgotSaga),
        takeLatest(FORGOT.SUBMIT, submitForgotFormSaga)
    ];
};


export const sagas = [watcherSaga];
