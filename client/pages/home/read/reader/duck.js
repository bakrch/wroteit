import { defineAction } from 'redux-define';
import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';

/* CONSTANTS */
export const GETBOOKID = defineAction('GETBOOKID');
export const BOOK = defineAction('BOOK',[REQUEST,SUCCESS,FAILURE]);


/* REDUCER */
const initialState = {
    book_id: '',
    loading: false,
    success: false,
    error: undefined,
    response: {}
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case BOOK.REQUEST:
            return {
                ...state,
                loading: true
            };
        case BOOK.SUCCESS:
            return {
                ...state,
                response: action.response[0],
                success: true
            };
        case BOOK.FAILURE:
            return {
                ...state,
                error: action.error
            };

        case GETBOOKID:
            return {
                ...state,
                book_id: action.bookId
            };
        default:
            return {
                ...state
            };
    }
}



/* ACTION CREATORS */
export const GetBookID = (location) => ({ type: GETBOOKID, bookId: location.split('/').slice(-1)[0] });

export const BookRequest = (bookId) => ({ type: BOOK.REQUEST, bookId });
export const BookSuccess = (response) => ({ type: BOOK.SUCCESS, response });
export const BookFailure = (error) => ({ type: BOOK.FAILURE, error });

/* SAGA */
const bookSaga = function* ({ bookId }) {

    console.log('reachable code: ' + bookId);
    const response = yield call(api.get, '/api/book/' + bookId);
    console.log('reachable response: ' + response);

    if (response.error){
        yield put(BookFailure(response.message));
    }

    yield put(BookSuccess(response));
};


const watcherSaga = function* () {

    yield [takeLatest(BOOK.REQUEST, bookSaga)];
};


export const sagas = [watcherSaga];
