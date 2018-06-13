import { defineAction } from 'redux-define';
import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';



/* CONSTANTS */
export const ACTIVATE = defineAction('ACTIVATE', [REQUEST, SUCCESS, FAILURE]);



/* REDUCER */
const initialState = {
    loading: false,
    success: false,
    error: undefined,
    response: undefined
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ACTIVATE.REQUEST:
            return {
                ...state,
                loading: true
            };
        case ACTIVATE.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response
            };
        case ACTIVATE.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}



/* ACTION CREATORS */
export const ActivateRequest = (data) => ({ type: ACTIVATE.REQUEST, data });
export const ActivateSuccess = (response) => ({ type: ACTIVATE.SUCCESS, response });
export const ActivateFailure = (error) => ({ type: ACTIVATE.FAILURE, error });



/* SAGA */
const activateSaga = function* ({ data }) {

    try {
        const response = yield call(api.post, '/api/signup/activate', { body: data });

        if (response.error) {
            yield put(ActivateFailure(response.message));
            // throw new Error(response.message);
        }
        else {
            yield put(ActivateSuccess(response));
        }
    }
    catch (e) {
        yield put(ActivateFailure(e));
        throw e;
    }

};



const watcherSaga = function* () {

    yield [
        takeLatest(ACTIVATE.REQUEST, activateSaga)
    ];
};


export const sagas = [watcherSaga];
