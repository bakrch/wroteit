import { defineAction } from 'redux-define';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FORM, SUBMIT, REQUEST, SUCCESS, FAILURE } from 'Landing/state-constants';
import { api } from 'Client/services';
import FormSaga from 'Client/helpers/form-saga';
import { EditorState, ContentState } from 'draft-js';

/* CONSTANTS */
export const SAVEBOOK = defineAction('SAVEBOOK', [REQUEST,SUCCESS,FAILURE]);
export const CHANGE = defineAction('CHANGE');
export const GETBOOKID = defineAction('GETBOOKID');
export const GETBOOK = defineAction('GETBOOK',[REQUEST,SUCCESS,FAILURE]);


/* REDUCER */
const initialState = {
    inputState: {},
    book_id: '',
    loading: false,
    success: false,
    error: undefined,
    response: undefined
};
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case GETBOOK.REQUEST:
            return {
                ...state,
                inputState: action.inputState
            };
        case GETBOOK.SUCCESS:
            return {
                ...state,
                response: action.response[0],
                success: true,
                inputState: {
                    ...state.inputState,
                    markdown: action.response[0].content.markdown,
                    html: action.response[0].content.html,
                    draftEditorState: EditorState.createWithContent(
                        ContentState.createFromText(
                            action.response[0].content.markdown
                        )
                    )
                }
            };
        case GETBOOK.FAILURE:
            return {
                ...state,
                error: action.error
            };
        case CHANGE:
            return {
                ...state,
                inputState: action.inputState
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
export const SaveBookRequest = (data) => ({ type: SAVEBOOK.REQUEST, data });
export const SaveBookSuccess = (response) => ({ type: SAVEBOOK.SUCCESS, response });
export const SaveBookFailure = (error) => ({ type: SAVEBOOK.FAILURE, error });

export const InputChange = (inputState) => ({ type: CHANGE, inputState });
export const GetBookID = (location) => ({ type: GETBOOKID, bookId: location.split('/').slice(-1)[0] });

export const GetBookRequest = (bookId) => ({ type: GETBOOK.REQUEST, bookId });
export const GetBookSuccess = (response) => ({ type: GETBOOK.SUCCESS, response });
export const GetBookFailure = (error) => ({ type: GETBOOK.FAILURE, error });

/* SAGA */
const getbookSaga = function* ({ bookId }) {

    const response = yield call(api.get, '/api/book/' + bookId);
    if (response.error){
        yield put(GetBookFailure(response.message));
    }
    else {
        yield put(GetBookSuccess(response));
    }
};
const savebookSaga = function* ({ data }) {

    const response = yield call(
        api.post,
        '/api/book/' + data.bookId,
        {
            body: {
                content: data.content
            }
        });
    if (response.error){
        yield put(GetBookFailure(response.message));
    }
    else {
        yield put(GetBookSuccess(response));
    }
};



const watcherSaga = function* () {

    yield [
        takeLatest(GETBOOK.REQUEST, getbookSaga),
        takeLatest(SAVEBOOK.REQUEST, savebookSaga)
    ];
};


export const sagas = [watcherSaga];
