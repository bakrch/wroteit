import { defineAction } from 'redux-define';
import { call, takeLatest } from 'redux-saga/effects';
import { FORM, SUBMIT, REQUEST } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';



/* CONSTANTS */
export const SIGNUP = defineAction('SIGNUP', [FORM, SUBMIT, REQUEST]);



/* REDUCER */
const initialState = {};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const SubmitSignupForm = (fields) => ({ type: SIGNUP.SUBMIT, fields });



/* SAGA */
const signupSaga = function* (data) {

    const response = yield call(api.post, '/api/signup', { body: data });
    if (response.error) {
        throw new Error(response.message);
    }
};


const submitSignupFormSaga = function* (data) {

    yield call(FormSaga, SIGNUP.FORM, signupSaga, data.fields);
};

const watcherSaga = function* () {

    yield [
        takeLatest(SIGNUP.REQUEST, signupSaga),
        takeLatest(SIGNUP.SUBMIT, submitSignupFormSaga)
    ];
};


export const sagas = [watcherSaga];
