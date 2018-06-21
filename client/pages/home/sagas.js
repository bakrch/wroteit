import { fork, all } from 'redux-saga/effects';

import { sagas as LogoutSaga } from './logout/duck';

import { sagas as BrowseSaga } from './read/duck';
import { sagas as ReaderSaga } from './read/reader/duck';

import { sagas as MybooksSaga } from './write/duck';
import { sagas as NewbookSaga } from './write/newBookForm/duck';
import { sagas as SavebookSaga } from './write/writer/duck';




export default function* () {

    yield all([
        ...LogoutSaga,
        ...BrowseSaga,
        ...ReaderSaga,
        ...MybooksSaga,
        ...NewbookSaga,
        ...SavebookSaga
    ].map((x) => fork(x))
    );
}

/*import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { api, history } from '../../services';
import * as actions from './login/actions';
import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';

const { login, logout, forgot, reset, getUserCreds } = actions;

const fetchEntity = function* (entity, apiFn, id, url) {

    yield put( entity.request(id) );
    const { response, error } = yield call(apiFn, url || id);
    if (response) {
        yield put( entity.success(id, response) );
    }
    else {
        yield put( entity.failure(id, error) );
    }
};

export const fetchUser       = fetchEntity.bind(null, login, api.fetchUser);
export const fetchRepo       = fetchEntity.bind(null, logout, api.fetchRepo);
export const fetchStarred    = fetchEntity.bind(null, forgot, api.fetchStarred);
export const fetchStargazers = fetchEntity.bind(null, reset, api.fetchStargazers);
export const fetchUserCreds  = fetchEntity.bind(null, getUserCreds, api.fetchStargazers);

const watchNavigate = function* watchNavigate() {

    while (true) {
        const { pathname } = yield take(actions.NAVIGATE);
        yield history.push(pathname);
    }
};

const loadUser = function* (login, requiredFields) {

    const user = yield select(getUser, login);
    if (!user || requiredFields.some((key) => !user.hasOwnProperty(key))) {
        yield call(fetchUser, login);
    }
};

// Fetches data for a User : user data + starred repos
const watchLoadUserPage = function* watchLoadUserPage() {

    while (true) {
        const { login, requiredFields = [] } = yield take(actions.LOAD_USER_PAGE);

        yield fork(loadUser, login, requiredFields);
        yield fork(loadStarred, login);
    }
};

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadRepoPage() {
    while (true) {
        const { fullName, requiredFields = [] } = yield take(actions.LOAD_REPO_PAGE);

        yield fork(loadRepo, fullName, requiredFields);
        yield fork(loadStargazers, fullName);
    }
}

// Fetches more starred repos, use pagination data from getStarredByUser(login)
function* watchLoadMoreStarred() {
    while (true) {
        const { login } = yield take(actions.LOAD_MORE_STARRED);
        yield fork(loadStarred, login, true);
    }
}

function* watchLoadMoreStargazers() {
    while (true) {
        const { fullName } = yield take(actions.LOAD_MORE_STARGAZERS);
        yield fork(loadStargazers, fullName, true);
    }
}

export default function* root() {
    yield all([
        fork(watchNavigate),
        fork(watchLoadUserPage),
        fork(watchLoadRepoPage),
        fork(watchLoadMoreStarred),
        fork(watchLoadMoreStargazers)
    ]);
}
*/
