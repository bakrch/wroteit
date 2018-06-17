import { defineAction } from 'redux-define';
import { call, takeLatest } from 'redux-saga/effects';
import { FORM, SUBMIT, REQUEST } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';



/* CONSTANTS */
export const NEWBOOK = defineAction('NEWBOOK', [FORM, SUBMIT, REQUEST]);



/* REDUCER */
const initialState = {};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const SubmitNewbookForm = (fields) => ({ type: NEWBOOK.SUBMIT, fields });



/* SAGA */
const newbookSaga = function* (data) {

    const response = yield call(api.post, '/api/books', { body: data });
    if (response.error) {
        throw new Error(response.message);
    }
};


const submitNewbookFormSaga = function* (data) {

    yield call(FormSaga, NEWBOOK.FORM, newbookSaga, data.fields);
};

const watcherSaga = function* () {

    yield [
        takeLatest(NEWBOOK.REQUEST, newbookSaga),
        takeLatest(NEWBOOK.SUBMIT, submitNewbookFormSaga)
    ];
};


export const sagas = [watcherSaga];
