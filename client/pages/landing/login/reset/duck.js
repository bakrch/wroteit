import { defineAction } from 'redux-define';
import { call, takeLatest } from 'redux-saga/effects';
import { FORM, SUBMIT, REQUEST } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';



/* CONSTANTS */
export const RESET = defineAction('RESET', [FORM, SUBMIT, REQUEST]);



/* REDUCER */
const initialState = {};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const SubmitResetForm = (fields) => ({ type: RESET.SUBMIT, fields });



/* SAGA */
const resetSaga = function* (data) {

    const response = yield call(api.post, '/api/login/reset', { body: data });
    if (response.error) {
        throw new Error(response.message);
    }
};


const submitResetFormSaga = function* (data) {

    yield call(FormSaga, RESET.FORM, resetSaga, data.fields);
};

const watcherSaga = function* () {

    yield [
        takeLatest(RESET.REQUEST, resetSaga),
        takeLatest(RESET.SUBMIT, submitResetFormSaga)
    ];
};


export const sagas = [watcherSaga];
