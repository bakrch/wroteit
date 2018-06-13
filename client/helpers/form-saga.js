import { put, call } from 'redux-saga/effects';
import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';


export default function* formSaga(formId, apiSaga, ...apiSagaArgs) {

    yield put(startSubmit(formId));

    try {
        yield call(apiSaga, ...apiSagaArgs);

        // yield put(reset(formId));
        yield put(stopSubmit(formId));
    }
    catch (err) {
        if (err instanceof SubmissionError) {
            yield put(stopSubmit(formId, err.errors));
        }
        else {
            yield put(stopSubmit(formId, { _error: err.message }));
        }
    }
}

// export default function* createEntity(entity, formId, apiFn, newEntity) {
//
//     yield put( entity.request() );
//     yield put( startSubmit(formId) );
//     const { response, error } = yield call(apiFn, newEntity);
//     if (response) {
//         yield put( entity.success(response) );
//         yield put( reset(formId) );
//         yield put( stopSubmit(formId) );
//     }
//     else {
//         yield put( entity.failure(error) );
//         // handle and format errors from api
//         yield put( stopSubmit(formId, serverValidationErrors) );
//     }
// }
